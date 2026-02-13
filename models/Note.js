// Import mongoose
const mongoose = require("mongoose");

// Create schema
const NoteSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export model
module.exports = mongoose.model("Note", NoteSchema);
