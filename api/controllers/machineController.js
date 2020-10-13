var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
var Connection = require("tedious").Connection;
var connection;

function connect(executeStatement) {
  var config = {
    server: "localhost", //update me
    authentication: {
      type: "default",
      options: {
        userName: "GERDAU", //update me
        password: "GERDAU", //update me
      },
    },
    options: {
      // If you are on Microsoft Azure, you need encryption:
      encrypt: false,
      database: "POCGERDAU", //update me
    },
  };
  connection = new Connection(config);
  connection.on("connect", function (err) {
    // If no error, then good to proceed.
    console.log("Connected");
    executeStatement();
  });
}

exports.getAllMachines = function (req, res) {
  res.send("aguante la fafa");
};

exports.setMachine = function (req, res) {
  console.log(req);
  connect(() => {
    request = new Request(
      `INSERT INTO machines (Nombre, Instalada, ultimoMantenimiento)
    VALUES ('${req.body.nombre}', '${req.body.instalada}', '${req.body.ultimoMantenimiento}');`,
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
    var result = "";
    request.on("row", function (columns) {
      columns.forEach(function (column) {
        if (column.value === null) {
          console.log("NULL");
        } else {
          result += column.value + " ";
        }
      });
      console.log(result);
      result = "";
    });
    res.send(request);
    request.on("done", function (rowCount, more) {
      console.log(rowCount + " rows returned");
    });
    connection.execSql(request);
  });
};
