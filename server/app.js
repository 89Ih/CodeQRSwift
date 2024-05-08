const express = require("express");
const app = express();
const { initFireBaseApp } = require('./db/firebaseDB')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
require('dotenv').config()
const PORT = process.env.PORT

require('./config')(app)
initFireBaseApp()

app.use('/api', indexRouter);
app.use('/auth/users', usersRouter);
app.listen(PORT, () => {
  console.log("Server is listing on " + `http://localhost:${PORT}`);
})

module.exports = app;
