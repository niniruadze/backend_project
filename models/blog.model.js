const mongoose = require("mongoose");

const commentSchema = require("./comment.model");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
    },

    comments: {
      type: [commentSchema],
    },

    images: {
      type: [String],
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

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
