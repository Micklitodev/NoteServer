const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api");

// app declared as the instance of express
const app = express();

// PORT is declared to process enviornemnt variables OR 3001
const PORT = process.env.PORT || 3001;

// Middleware to parse
app.use(express.static("public"));
app.use(express.json());

// get request so that the root url is sent the file index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// get request so that the /notes endpoint is sent the file notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Middleware for all apiRouter to be prefixed with /api
// see routes/api.js for more info.
app.use("/api", apiRouter);

//Declare the server to listen on specified PORT
app.listen(PORT, () => {
  console.log(`serverlisteningport:${PORT}`);
});
