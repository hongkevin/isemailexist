var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var verifier = require('email-verify');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// email-verify npm 을 사용해서 이메일 존재여부(existence) 확인
var isValid = function(req, res) {
  var input = req.body.input;

  verifier.verify(input, function(err, info) {
    if (err) {
      res.send("err");
      console.log(err);
    } else {
      res.json({
        "Success" : info.success
      });
    }
  });
};

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/', function(req, res) {
  isValid(req, res);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});