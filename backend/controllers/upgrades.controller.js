const db = require("../models");
const Upgrades = db.upgrades; 

const getAllUpgrades = async (req, res) => {
  try {
    const upgrades = await Upgrades.findAll();
    res.json(upgrades);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving upgrades.",
    });
  }
};

const getUpgradesById = async (req, res) => {
  const id = req.params.id;
  try {
    const upgrades = await Upgrades.findByPk(id);
    res.json(upgrades);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error retrieving Upgrades with id=${id}`,
    });
  }
};

const createUpgrades = async (req, res) => {
  const { tier, jewels, weaponId } = req.body;
  try {
    await Upgrades.create({ tier, jewels, weaponId });
    res.status(201).send("Upgrades created successfully");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Upgrades.",
    });
  }
};

const updateUpgrades = async (req, res) => {
  const id = req.params.id;
  const { tier, jewels, weaponId } = req.body;
  try {
    await Upgrades.update({ tier, jewels, weaponId }, { where: { id: id } });
    res.send("Upgrades was updated successfully.");
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating Upgrades with id=${id}`,
    });
  }
};

const deleteUpgrades = async (req, res) => {
  const id = req.params.id;
  try {
    await Upgrades.destroy({ where: { id: id } });
    res.send("Upgrades was deleted successfully.");
  } catch (err) {
    res.status(500).send({
      message: err.message || `Could not delete Upgrades with id=${id}`,
    });
  }
};

module.exports = {
  getAllUpgrades,
  getUpgradesById,
  createUpgrades,
  updateUpgrades,
  deleteUpgrades,
};
