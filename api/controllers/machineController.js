var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
var Connection = require("tedious").Connection;
var connection;

function connect(executeStatement) {
  var config = {
    server: `${process.env.server}`, //update me
    authentication: {
      type: "default",
      options: {
        userName: `${process.env.user}`, //update me
        password: `${process.env.password}`, //update me
      },
    },
    options: {
      // If you are on Microsoft Azure, you need encryption:
      encrypt: false,
      database: `${process.env.database}`, //update me
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
  console.log(req);
  connect(() => {
    request = new Request(`SELECT * FROM machines`, function (err) {
      if (err) {
        console.log(err);
      }
    });

    _rows = [];
    request.on("row", (columns) => {
      var _item = {};
      // Converting the response row to a JSON formatted object: [property]: value
      for (var name in columns) {
        console.log(columns);
        _item[columns[name].metadata.colName] = columns[name].value;
      }
      _rows.push(_item);
    });

    request.on("doneProc", (rowCount, more, rows) => {
      res.send(_rows);
    });
    connection.execSql(request);
  });
};

exports.setMachine = function (req, res) {
  console.log(req);
  connect(() => {
    request = new Request(
      `INSERT INTO machines (nombre, instalada, ultimoMantenimiento)
    VALUES ('${req.body.nombre}', '${req.body.instalada}', '${req.body.ultimoMantenimiento}');`,
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );

    request.on("doneProc", (rowCount, more, rows) => {
      res.send(req.body);
    });
    connection.execSql(request);
  });
};
