const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.create({ title, content, author_id: req.user.id });
  console.log("blog", blog)
  res.json(blog);
};

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('author_id', 'name');
  res.json(blogs);
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  console.log("delete", req.params.id)
  res.json({ message: 'Deleted' });
};
