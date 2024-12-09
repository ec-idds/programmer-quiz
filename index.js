const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const Handlebars = require("handlebars");

let questionData;
try {
  const jsonData = fs.readFileSync("question_data.json", "utf8");
  questionData = JSON.parse(jsonData);
} catch (err) {
  console.error("Error reading or parsing question_data.json:", err);
  process.exit(1); // Exit the server if the JSON file is not accessible
}

app.use(express.static("html"));

app.get("/", (req, res) => {
  fs.readFile("html/startpage.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

app.get("/q", (req, res) => {
  fs.readFile("html/questionpage.html", function (err, htmlData) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }

    const questionTemplate = Handlebars.compile(htmlData.toString());
    const questionNumber = parseInt(req.query.p, 10);

    // Find the question by ID
    const question = questionData.find((q) => q.id === questionNumber);

    if (!question) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("Question not found");
    }

    // Replace placeholders with data
    const replacements = {
      qno: questionNumber,
      question: question.question,
      answers: question.answers.map((answer) => answer.text), // Pass array of answer texts
    };

    const renderedHtml = questionTemplate(replacements);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(renderedHtml);
    return res.end();
  });
});

app.get("/r", (req, res) => {
  fs.readFile("html/resultspage.html", function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
