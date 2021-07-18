require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
var indexRouter = require('./routes/index');
const connection = require('./config/connection.js');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));
app.use('/', indexRouter);

connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on Port ${3000}`);
});

module.exports = app;
