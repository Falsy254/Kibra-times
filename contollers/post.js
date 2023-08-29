const Post = require("../models/post");
const addposts = async (req, res) => {
  try {
    const {
      postImg,
      postTitle,
      postSummary,
      postBody,
      postCategory,
      postTags,
      postSection,
      postAuthor,
      postDate,
    } = req.body;
    const newpost = new Post({
      postImg,
      postTitle,
      postSummary,
      postBody,
      postCategory,
      postTags,
      postSection,
      postAuthor,
      postDate,
    });
    const savedpost = await newpost.save();
    res.status(201).json(savedpost);
  } catch (error) {
    console.log(error);
  }
};
const getposts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};
const singleposts = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};
const updateposts = async (req, res) => {
  try {
    const id = req.params.id;
    const options = { new: true };
    const updatedpost = await Post.findByIdAndUpdate(id, req.body, options);
    res.status(200).json(updatedpost);
  } catch (error) {
    res.status(404).json(error);
  }
};
const deletedposts = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedpost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletedpost);
  } catch (error) {
    res.status(404).json(error);
  }
};
module.exports = { addposts, getposts, singleposts, updateposts, deletedposts };
