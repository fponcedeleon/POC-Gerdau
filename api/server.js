const express = require("express");
const app = express();
const port = 4000;

exports.start = async () => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  }); /*
    await server.register([connectors, auth, routes, { plugin: Blipp }]);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line no-console
    return server;*/
};
