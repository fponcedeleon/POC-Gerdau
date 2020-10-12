var sql = require("mssql");

// config for your database
var config = {
  user: `${process.env.user}`,
  password: `${process.env.password}`,
  server: `${process.env.server}`,
  database: `${process.env.database}`,
};

console.log(config);

exports.getAllMachines = function (req, res) {
  res.send("aguante la fafa");
};

exports.setMachine = function (req, res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query(
      `INSERT INTO machines (Nombre, Instalada, ultimoMantenimiento)
  VALUES ('Cardinal', 'Erichsen', 'Skagen 21');`,
      function (err, recordset) {
        if (err) console.log(err);
        // send records as a response
        res.send(recordset);
      }
    );
  });
};
