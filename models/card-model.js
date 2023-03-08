const { Schema, model } = require("mongoose");

const CardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  words: [
    {
      word: { type: String, required: true },
      translate: { type: String, required: true },
    },
  ],
});

module.exports = model("Card", CardSchema);
