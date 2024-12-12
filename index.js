const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

let questionData;
try {
  const jsonData = fs.readFileSync(
    path.join(__dirname, "question_data.json"),
    "utf8",
  );
  questionData = JSON.parse(jsonData);
} catch (err) {
  console.error("Error reading or parsing question_data.json:", err);
  process.exit(1);
}

app.use(express.static(path.join(__dirname, "html")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "startpage.html"));
});

app.get("/q", (req, res) => {
  fs.readFile(
    path.join(__dirname, "html", "questionpage.html"),
    "utf8",
    (err, htmlData) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }

      const questionTemplate = Handlebars.compile(htmlData.toString());
      const questionNumber = parseInt(req.query.p, 10);
      const totalQuestions = questionData.length;

      // Find the question by ID
      const question = questionData.find((q) => q.id === questionNumber);

      if (!question) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("Question not found");
      }

      const replacements = {
        qno: questionNumber,
        question: question.question,
        answers: question.answers.map((answer) => answer.text),
        isFirstQuestion: questionNumber === 1,
        isLastQuestion: questionNumber === totalQuestions,
      };

      const renderedHtml = questionTemplate(replacements);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(renderedHtml);
      return res.end();
    },
  );
});

app.get("/r", (req, res) => {
  fs.readFile(path.join(__dirname, "html", "resultspage.html"), (err, data) => {
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
