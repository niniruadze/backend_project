const blogModel = require("../models/blog.model");

module.exports = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';

      const skip = (page - 1) * limit;
      const query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ]
      };

      const total = await blogModel.countDocuments(query);
      const data = await blogModel.find(query).skip(skip).limit(limit);

      res.json({
        total,
        page,
        pages: Math.ceil(total / limit),
        data
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getById: async (req, res) => {
    try {
      const item = await blogModel.findById(req.params.id);
      res.json(item);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  add: async (req, res) => {
    try {
      const savedItem = await new blogModel(req.body).save();
      res.json(savedItem);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  delete: async (req, res) => {
    try {
      await blogModel.deleteOne({ _id: req.params.id });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  update: async (req, res) => {
    try {
      const item = await blogModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
          new: true,
        }
      );
      res.json(item);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addComment: async (req, res) => {
    try {
      const blog = await blogModel.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({
          error: "Blog not found",
        });
      }

      blog.comments.push(req.body);
      const updateBlog = await blog.save();
      res.json(updateBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  removeComment: async (req, res) => {
    try {
      const blog = await blogModel.findById(req.params.blogId);
      if (!blog) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      const commentIndex = blog.comments.findIndex(
        (comment) => comment._id.toString() === req.params.commentId
      );
      if (commentIndex === -1) {
        return res.status(404).json({ error: "Comment not found" });
      }

      blog.comments.splice(commentIndex, 1);
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
