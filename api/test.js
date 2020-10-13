var Connection = require("tedious").Connection;

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
var connection = new Connection(config);
connection.on("connect", function (err) {
  // If no error, then good to proceed.
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
    executeStatement();
  }
});

var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

function executeStatement() {
  request = new Request(
    `INSERT INTO machines (Nombre, Instalada, ultimoMantenimiento)
    VALUES ('Cardinal', 'Erichsen', 'Skagen 21');`,
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

  request.on("done", function (rowCount, more) {
    console.log(rowCount + " rows returned");
  });
  connection.execSql(request);
}
