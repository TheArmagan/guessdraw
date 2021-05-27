const { Schema, model } = require("mongoose");
const wordLists = require("../data/wordLists");



module.exports = model("game", new Schema({
  wordList: {
    default: wordLists.list1,
    type: [String]
  },
  playerList: {
    default: [],
    type: [String]
  },
  ownerPlayer: {
    type: String,
    required: true
  },
  currentWord: {
    default: "",
    type: String
  }
}));