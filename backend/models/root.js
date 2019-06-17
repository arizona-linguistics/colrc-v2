const mysql = require('mysql');

const Schema = mysql.Schema;

const rootSchema = new Schema({
  //id should be generated
  root: String,
  number: String,
  salish: String,
  nicodemus: String,
  english: String
});

module.exports = mysql.model('Root', rootSchema);
