# -*- coding: utf-8 -*-
"""Spoof-Detection-MobileNetV3Small-Fine-Tuning.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/13YUtypQAoawmthUQzABBsQ-qN5pUt35y

# Spoof Detection using ViT-S/32 Medium Augmentation

## Setup
"""

!nvidia-smi

"""## Data Gathering"""

!wget -q https://github.com/Codebugged-Research/ExamOnlineFinal/releases/download/1.0.0.0/spoof-dataset-final.zip
!unzip -qq spoof-dataset-final.zip

"""## Imports"""

import numpy as np
import matplotlib.pyplot as plt
from imutils import paths
from pprint import pprint
from collections import Counter
from sklearn.preprocessing import LabelEncoder

import tensorflow as tf
from tensorflow import keras
import tensorflow_hub as hub

SEEDS = 42

tf.random.set_seed(SEEDS)
np.random.seed(SEEDS)

"""## Data Parsing"""

image_paths = list(paths.list_images("spoof-dataset-final"))
np.random.shuffle(image_paths)
image_paths[:5]

"""## Counting number of images for each classes"""

labels = []
for image_path in image_paths:
    label = image_path.split("/")[1]
    labels.append(label)
class_count = Counter(labels) 
pprint(class_count)

"""## Splitting the dataset"""

TRAIN_SPLIT = 0.9

i = int(len(image_paths) * TRAIN_SPLIT)

train_paths = image_paths[:i]
train_labels = labels[:i]
validation_paths = image_paths[i:]
validation_labels = labels[i:]

print(len(train_paths), len(validation_paths))

"""## Define Hyperparameters"""

BATCH_SIZE = 256
AUTO = tf.data.AUTOTUNE
EPOCHS = 100
IMG_SIZE = 224
RESIZE_TO = 260
NUM_CLASSES = 2

"""## Encoding labels"""

label_encoder = LabelEncoder()
train_labels_le = label_encoder.fit_transform(train_labels)
validation_labels_le = label_encoder.transform(validation_labels)
print(train_labels_le[:5])

"""## Determine the class-weights"""

trainLabels = keras.utils.to_categorical(train_labels_le)
classTotals = trainLabels.sum(axis=0)
classWeight = dict()
# loop over all classes and calculate the class weight
for i in range(0, len(classTotals)):
	classWeight[i] = classTotals.max() / classTotals[i]

"""## Convert the data into TensorFlow `Dataset` objects"""

train_ds = tf.data.Dataset.from_tensor_slices((train_paths, train_labels_le))
val_ds = tf.data.Dataset.from_tensor_slices((validation_paths, validation_labels_le))

"""## Define the preprocessing function"""

@tf.function  
def preprocess_train(image_path, label):
    image = tf.io.read_file(image_path)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, (RESIZE_TO, RESIZE_TO))
    image = tf.image.random_crop(image, [IMG_SIZE, IMG_SIZE, 3])
    image = tf.cast(image, tf.float32)
    return (image, label)

@tf.function
def preprocess_test(image_path, label):
    image = tf.io.read_file(image_path)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, (IMG_SIZE, IMG_SIZE))
    image = tf.cast(image, tf.float32)
    return (image, label)

"""## Data Augmentation"""

data_augmentation = tf.keras.Sequential(
    [
        tf.keras.layers.experimental.preprocessing.RandomFlip("horizontal_and_vertical"),
        tf.keras.layers.experimental.preprocessing.RandomRotation(factor=0.02),
        tf.keras.layers.experimental.preprocessing.RandomZoom(
            height_factor=0.2, width_factor=0.2
        ),
    ],
    name="data_augmentation",
)

"""## Create the Data Pipeline"""

pipeline_train = (
    train_ds
    .shuffle(BATCH_SIZE * 100)
    .map(preprocess_train, num_parallel_calls=AUTO)
    .batch(BATCH_SIZE)
    .map(lambda x, y: (data_augmentation(x), y), num_parallel_calls=AUTO)
    .prefetch(AUTO)
)

pipeline_validation = (
    val_ds
    .map(preprocess_test, num_parallel_calls=AUTO)
    .batch(BATCH_SIZE)
    .prefetch(AUTO)
)

"""## Visualise the training images"""

image_batch, label_batch = next(iter(pipeline_train))

plt.figure(figsize=(10, 10))
for i in range(9):
    ax = plt.subplot(3, 3, i + 1)
    plt.imshow(image_batch[i].numpy().astype("uint8"))
    label = label_batch[i]
    plt.title(label_encoder.inverse_transform([label.numpy()])[0])
    plt.axis("off")

"""## Load model into KerasLayer"""

def get_training_model(trainable=False):
    # Load the MobileNetV3 model but exclude the classification layers
    EXTRACTOR = keras.applications.MobileNetV3Small(weights="imagenet", include_top=False,
                    input_shape=(224, 224, 3))
    # We will set it to both True and False
    EXTRACTOR.trainable = trainable
    # Construct the head of the model that will be placed on top of the
    # the base model
    class_head = EXTRACTOR.output
    class_head = keras.layers.GlobalAveragePooling2D()(class_head)
    class_head = keras.layers.Dense(512, activation="relu")(class_head)
    class_head = keras.layers.Dropout(0.5)(class_head)
    class_head = keras.layers.Dense(NUM_CLASSES, activation="softmax")(class_head)

    # Create the new model
    classifier = tf.keras.Model(inputs=EXTRACTOR.input, outputs=class_head)

    # Compile and return the model
    classifier.compile(loss="sparse_categorical_crossentropy", 
                          optimizer="adam",
                          metrics=["accuracy"])

    return classifier

model = get_training_model()

"""## Setup Callbacks"""

train_callbacks = [
    keras.callbacks.EarlyStopping(monitor='val_accuracy', patience=2, restore_best_weights=True),
    keras.callbacks.CSVLogger('./train-logs.csv'),
    keras.callbacks.TensorBoard(histogram_freq=1)
]

"""## Train the model"""

history = model.fit(
    pipeline_train,
    batch_size=BATCH_SIZE,
    epochs= EPOCHS, 
    validation_data=pipeline_validation,
    class_weight=classWeight,
    callbacks=train_callbacks)

"""## Plot the Metrics"""

def plot_hist(hist):
    plt.plot(hist.history["accuracy"])
    plt.plot(hist.history["val_accuracy"])
    plt.plot(hist.history["loss"])
    plt.plot(hist.history["val_loss"])
    plt.title("Training Progress")
    plt.ylabel("Accuracy/Loss")
    plt.xlabel("Epochs")
    plt.legend(["train_acc", "val_acc", "train_loss", "val_loss"], loc="upper left")
    plt.show()

"""## Evaluate the model"""

accuracy = model.evaluate(pipeline_validation)[1] * 100
print("Accuracy: {:.2f}%".format(accuracy))

plot_hist(history)

model.save('saved-model')

!pip install -q  tensorflowjs

!tar -cvf "/content/saved-model.tar" "/content/saved-model"

!tensorflowjs_converter \
    --input_format=tf_saved_model \
    --saved_model_tags=serve \
    /content/saved-model \
    /content/web_model

!tar -cvf "/content/web_model.tar" "/content/web_model/"

# Commented out IPython magic to ensure Python compatibility.
# %load_ext tensorboard
# %tensorboard --logdir logs

!tensorboard dev upload --logdir logs --name "Spoof Classification" --description "Spoof Classification using MobileNetV3"

"""https://tensorboard.dev/experiment/42f4MAh0R2C3QF2wR9ZSLw/"""