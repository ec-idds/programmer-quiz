const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const Handlebars = require("handlebars");

var template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>");

app.use(express.static("html"));

app.get("/test", (req, res) => {
  let data = template({ doesWhat: "rocks!" });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(data);
  return res.end();
});

app.get("/", (req, res) => {
  fs.readFile("html/startpage.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

app.get("/q", (req, res) => {
  fs.readFile("html/questionpage.html", function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }
    const questionTemplate = Handlebars.compile(data.toString());
    const questionNumber = req.query.p;
    const replacements = { qno: questionNumber };
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(questionTemplate(replacements));
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
