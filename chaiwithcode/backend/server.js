import express from "express";
const app = express();

//get a list of 5 jokes

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "A joke",
      content: "Why did the scarecrow win an",
    },
    {
      id: 2,
      title: "Another Joke",
      content: "Why was the math book sad? Because it",
    },
    {
      id: 3,
      title: "A statement",
      content: "Why did the clock go to therapy? Because it",
    },
    {
      id: 4,
      title: "A riddle",
      content: "Why did the tomato turn red? Because it",
    },
    {
      id: 5,
      title: "A query",
      content: "Why did the computer catch a virus? Because it",
    },
  ];
  res.send(jokes);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http:localhost:${port}`);
});
