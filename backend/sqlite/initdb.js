const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.dat');

db.serialize(function() {
  // db.run('DROP TABLE peoples;');
  db.run('CREATE TABLE peoples(whom_name TEXT, whom_position TEXT, header TEXT, email TEXT, timestamp INTEGER)');
});
db.close();
