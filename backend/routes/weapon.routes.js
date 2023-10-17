module.exports = app => {
  const weapons = require("../controllers/weapon.controller");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  // Create a new Weapon
  router.post("/", upload.single('file'), weapons.create);
  router.post("/", weapons.create);

  // Retrieve all Weapons
  router.get("/", weapons.findAll);

  // Retrieve a single Weapon with id
  router.get("/:id", weapons.findOne);

  // Update a Weapon with id
  router.put("/:id", weapons.update);

  // Delete a Weapon with id
  router.delete("/:id", weapons.delete);

  app.use("/api/weapons", router);
}