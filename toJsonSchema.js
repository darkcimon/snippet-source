const toJsonSchema = require("to-json-schema")
const fs = require('fs');
const express = require('express')
const app = express()

app.use(express.json());

app.get('/', function(request, response) {
  console.log('get /')
  console.dir("param",request.param);
  console.dir("body",request.body);
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end('thanks')
});

app.post('/', function(request, response) {
  console.log('POST /')
  // console.log("fileName",request.body.fileName);
  console.log("body",request.body);
  console.log("param",request.param);
  const file = './isac-apis/'+(request.body.fileName.replace(/\//g,"."))+'.json';
  if(!fs.existsSync(file)){
    fs.writeFile(file, JSON.stringify(request.body.data, null, 4), function(err) {
    if(err) {
      console.log(err);
    }
  });
  }
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end('thanks')
});

app.listen(3000)
console.log(`Listening at http://localhost:3000`)

