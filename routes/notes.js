const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route
notes.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route
notes.post("/notes", (req, res) => {
  const { title, text, user_id } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      user_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Note added!");
  } else {
    res.error("Error adding note");
  }
});


module.exports = notes;
