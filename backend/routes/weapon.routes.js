const weapons = require("../controllers/weapon.controller");
const upgrades = require("../controllers/upgrades.controller");
const upload = require('../multer/upload');
const express = require("express");

const weaponRouter = express.Router();
const upgradesRouter = express.Router();

// Weapons routes
weaponRouter.post("/", upload.single('file'), weapons.create);
weaponRouter.get("/", weapons.findAll);
weaponRouter.get("/:id", weapons.findOne);
weaponRouter.put("/:id", upload.single('file'), weapons.update);
weaponRouter.delete("/:id", weapons.delete);

// Upgrades routes
upgradesRouter.post("/", upgrades.createUpgrades);
upgradesRouter.get("/", upgrades.getAllUpgrades);
upgradesRouter.get("/:id", upgrades.getUpgradesById);
upgradesRouter.put("/:id", upgrades.updateUpgrades);
upgradesRouter.delete("/:id", upgrades.deleteUpgrades);

module.exports = app => {
  app.use("/api/weapons", weaponRouter);
  app.use("/api/upgrades", upgradesRouter);
};
