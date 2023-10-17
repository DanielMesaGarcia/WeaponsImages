module.exports = app => {
  const bicycles = require("../controllers/bicycle.controller");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  // Create a new Bicycle
  router.post("/", upload.single('file'), bicycles.create);
  router.post("/", bicycles.create);

  // Retrieve all Bicycles
  router.get("/", bicycles.findAll);

  // Retrieve a single Bicycle with id
  router.get("/:id", bicycles.findOne);

  // Update a Bicycle with id
  router.put("/:id", bicycles.update);

  // Delete a Bicycle with id
  router.delete("/:id", bicycles.delete);

  app.use("/api/bicycles", router);
}