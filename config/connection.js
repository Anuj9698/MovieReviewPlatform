const mongoose = require('mongoose');
var config = require('./index');

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  mongoose.connect(
    `mongodb+srv://${config.database.username}:${config.database.password}@${config.database.host}/${config.database.databaseName}?retryWrites=true&w=majority`,
    options
  );
} catch (err) {
  console.log('Could not connect to mongo server!');
  logger.error(err);
}

module.exports = mongoose.connection;
