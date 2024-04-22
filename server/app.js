var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var PORT = process.env.PORT
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require("cors");
const NEXT_ = process.env.ORIGIN;
console.log(NEXT_);
var app = express();
app.set("trust proxy", 1);
app.use(
    cors({
      origin: [NEXT_],
      methods:["POST","GET","DELETE","PUT"]
    })
  );
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/auth/users', usersRouter);
app.listen(PORT, () => {
    console.log("Server is listing on.." + "\n" + `http://localhost:${PORT}`);
})

module.exports = app;
