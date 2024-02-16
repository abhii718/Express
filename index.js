const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// const harryMiddleware = (req, res, next) => {
//   console.log(req);
//   next();
// };

app.use(express.static(path.join(__dirname, "public"))); //default
// app.use(harryMiddleware);

app.get("/hello:name", (req, res) => {
  res.send("Hello World!" + req.parans.name);
});

app.get("/about", (req, res) => {
  //   res.sendFile(path.join(__dirname, "index.html"));
  res.json({ abhii: 34 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
