const db = require("../models");
const Upgrades = db.upgrades; // Asegúrate de que el modelo se importe correctamente

// Resto del código del controlador

// Resto del código del controlador

// Obtener todos los registros de Upgrades
const getAllUpgrades = async (req, res) => {
  try {
    const upgrades = await db.upgrades.findAll();
    res.json(upgrades);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving upgrades.",
    });
  }
};

// Obtener un registro de Upgrades por ID
const getUpgradesById = async (req, res) => {
  const id = req.params.id;
  try {
    const upgrades = await db.upgrades.findByPk(id);
    res.json(upgrades);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Upgrades with id=" + id,
    });
  }
};

// Crear un nuevo registro de Upgrades
const createUpgrades = async (req, res) => {
  const { name, quantity, weaponId } = req.body;
  try {
    await db.upgrades.create({ name, quantity, weaponId });
    res.status(201).send("Upgrades created successfully");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Upgrades.",
    });
  }
};

// Actualizar un registro de Upgrades por ID
const updateUpgrades = async (req, res) => {
  const id = req.params.id;
  const { name, quantity, weaponId } = req.body;
  try {
    await db.upgrades.update({ name, quantity, weaponId }, { where: { id: id } });
    res.send("Upgrades was updated successfully.");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating Upgrades with id=" + id,
    });
  }
};

// Eliminar un registro de Upgrades por ID
const deleteUpgrades = async (req, res) => {
  const id = req.params.id;
  try {
    await db.upgrades.destroy({ where: { id: id } });
    res.send("Upgrades was deleted successfully.");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete Upgrades with id=" + id,
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
