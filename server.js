const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`serverlisteningport:${PORT}`);
});
