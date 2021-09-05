const express = require('express');
const app = express();
const cors = require('cors');
const port =7000;
const port2=7001;
const path = require("path");
const http = require("http");
const https = require("https");
const httpapp = express();
const fs = require('fs');

httpapp.get("*", function (req, res, next) {
  res.redirect("https://" + req.headers.host + req.path);
});



app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/hello", (req, res) => {
    res.send("hello world!");
})

const httpServer = http.createServer(httpapp);
httpServer.listen(port, () => {
  console.log("HTTP Server running on port 7000");
});
const httpsServer = https.createServer(
  {
    key: fs.readFileSync(path.resolve(__dirname, "/etc/letsencrypt/live/codebugged.com/privkey.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "/etc/letsencrypt/live/codebugged.com/cert.pem")),
  },
  app
);

httpsServer.listen(port2, () => {
  console.log("HTTPS Server running on port 7001");
});

// app.listen(port, () => {
//     console.log(`server running ${port}`);
//   });