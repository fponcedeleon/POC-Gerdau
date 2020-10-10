const ControllerMac = require("../controllers/machineController");

module.exports = function (app) {
  /*MAQUINAS */
  // devolver todas las publicaciones
  app.get("/api/machine", ControllerMac.getAllMachines);
  // Crear una nueva publicacion
  app.post("/api/machine", ControllerMac.setMachine);
};
