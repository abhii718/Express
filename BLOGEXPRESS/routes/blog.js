const express = require("express");
const path = require("path");
const blogs = require("../data/blogs");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../templates/index.html"));
});

router.get("/blogpost/:slug", (req, res) => {
  const slug = req.params.slug;
  const filteredBlog = blogs.find((blog) => blog.slug === slug);

  console.log(filteredBlog); // Log the filtered blog post to the console



  // Send the blog page HTML file
  res.sendFile(path.join(__dirname, "../templates/blogpage.html"));
});

module.exports = router;
