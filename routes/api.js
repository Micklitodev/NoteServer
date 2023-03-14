const express = require("express");
const path = require("path");
const fs = require("fs");
const randId = require("../ranid");

const apiRouter = express.Router();

// get request for /api/notes

apiRouter.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

// post req for /api/notes to push new data from req body with id
// as object to read array data. then re write- over existing data
// with pushed newdata included.

apiRouter.post("/notes", (req, res) => {
  const { title, text } = req.body;
  let id = randId();
  console.log(id);

  const newData = {
    title,
    text,
    id,
  };

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newData);

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(parsedData, null, 5),
        (err) => {
          err ? console.log(err) : console.log("sucess");
        }
      );
      res.send();
    }
  });
});

// delete request for /api/note/:id takes the request params, reads db.json
// parsesdata then the index is found and parseddata is spliced by index,1.
// data is then re written to the db.js with specific id deleted.

apiRouter.delete("/notes/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      const index = parsedData.findIndex((note) => note.id == id);
      if (index !== -1) {
        parsedData.splice(index, 1);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedData, null, 5),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Note deleted");
              res.send();
            }
          }
        );
      } else {
        console.log(err);
        res.send();
      }
    }
  });
});

module.exports = apiRouter;
