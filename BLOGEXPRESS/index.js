const express = require("express");
var exphbs  = require('express-handlebars');

const path = require("path");
const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

// Use the blog route
app.use("/", require("./routes/blog")); // Assuming "routes/blog.js" contains your blog route definitions

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
