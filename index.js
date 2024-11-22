const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000
const http = require('http');
const url = require('url');
const fs = require('fs');



app.get('/', (req, res) => {
  fs.readFile('html/startpage.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/q', (req, res) => {
  var q = url.parse(req.url, true);
  fs.readFile('html/questionpage.html', function(err, data){
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
