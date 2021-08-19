"use strict";
const controls = window;
const drawingUtils = window;
const mpFaceMesh = window;
// Our input frames will come from here.
const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const controlsElement = document.getElementsByClassName("control-panel")[0];
const canvasCtx = canvasElement.getContext("2d");
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new controls.FPS();
// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector(".loading");
spinner.ontransitionend = () => {
    spinner.style.display = "none";
};
function onResults(results) {
    // Hide the spinner.
    document.body.classList.add("loaded");
    // Update the frame rate.
    fpsControl.tick();
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
    );
    if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_TESSELATION, { color: '#C0C0C070', lineWidth: 1 });
            drawingUtils.drawConnectors(
                canvasCtx,
                landmarks,
                mpFaceMesh.FACEMESH_RIGHT_EYE,
                { color: "#FF3030" }
            );
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_RIGHT_EYEBROW, { color: '#FF3030' });
            drawingUtils.drawConnectors(
                canvasCtx,
                landmarks,
                mpFaceMesh.FACEMESH_LEFT_EYE,
                { color: "#30FF30" }
            );
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_LEFT_EYEBROW, { color: '#30FF30' });
            // drawingUtils.drawConnectors(canvasCtx, landmarks, mpFaceMesh.FACEMESH_FACE_OVAL, { color: '#E0E0E0' });
            drawingUtils.drawConnectors(
                canvasCtx,
                landmarks,
                mpFaceMesh.FACEMESH_LIPS,
                { color: "#E0E0E0" }
            );
        }
    }
    canvasCtx.restore();
}
const faceMesh = new FaceMesh({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`;
    },
});
faceMesh.onResults(onResults);
// Present a control panel through which the user can manipulate the solution
// options.
new controls.ControlPanel(controlsElement, {
    selfieMode: true,
    maxNumFaces: 2,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
})
    .add([
        new controls.StaticText({ title: "MediaPipe Face Mesh" }),
        fpsControl,
        new controls.Toggle({ title: "Selfie Mode", field: "selfieMode" }),
        new controls.SourcePicker({
            onSourceChanged: () => {
                faceMesh.reset();
            },
            onFrame: async (input, size) => {
                const aspect = size.height / size.width;
                let width, height;
                if (window.innerWidth > window.innerHeight) {
                    height = window.innerHeight;
                    width = height / aspect;
                } else {
                    width = window.innerWidth;
                    height = width * aspect;
                }
                canvasElement.width = width;
                canvasElement.height = height;
                await faceMesh.send({ image: input });
            },
            examples: {
                videos: [],
                images: [],
            },
        }),
    ])
    .on((x) => {
        const options = x;
        videoElement.classList.toggle("selfie", options.selfieMode);
        faceMesh.setOptions(options);
    });
