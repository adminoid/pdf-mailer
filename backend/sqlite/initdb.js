const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.dat');

db.serialize(function() {
  // db.run('DROP TABLE peoples;');
  db.run('CREATE TABLE peoples(whom_position TEXT, whom_name TEXT, header TEXT, email TEXT, timestamp INTEGER)');
});
db.close();
