const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      max: 500,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comments", CommentSchema);
