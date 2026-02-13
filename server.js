require("dotenv").config(); // Load .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Note = require("./models/Note");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/*
API KEY MIDDLEWARE
Checks if request has correct API key
*/
function checkApiKey(req, res, next) {
  const key = req.headers["x-api-key"];

  if (key === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Invalid API Key" });
  }
}

/*
POST /notes
Add note
*/
app.post("/notes", checkApiKey, async (req, res) => {
  const note = new Note({
    text: req.body.text
  });

  await note.save();
  res.json(note);
});

/*
GET /notes
Get all notes
*/
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});
// DELETE all notes
app.delete("/notes", async (req, res) => {
  await Note.deleteMany();
  res.json({ message: "All notes deleted" });
});


// Start server
app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
