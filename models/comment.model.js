const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    likeCount: {
      type: Number,
      default: 0,
    },

    dislikeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    read: "nearest",
    writeConcern: {
      w: "majority",
      wtimeoutMS: 30000,
      j: true,
    },
  }
);

module.exports = commentSchema;
