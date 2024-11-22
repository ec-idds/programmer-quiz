const express = require('express')
const app = express()
const port = 3000

var http = require('http');
var fs = require('fs');

app.get('/', (req, res) => {
  fs.readFile('html/startpage.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
