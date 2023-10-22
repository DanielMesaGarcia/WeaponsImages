const db = require("../models");
const Upgrades = db.upgrades; 

const getAllUpgrades = async (req, res) => {
  const weaponId = req.query.weaponId;
  try {
    const upgrades = await Upgrades.findAll({
      where: { weaponId: weaponId },
    });
    res.json(upgrades);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Some error occurred while retrieving upgrades for weaponId=${weaponId}.`,
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
    const newUpgrade = await Upgrades.create({
      tier: tier,
      jewels: jewels,
      weaponId: weaponId
    });
    res.json(newUpgrade);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Upgrade."
    });
  }
};


const updateUpgrades = async (req, res) => {
  const id = req.params.id;
  try {
    const [numUpdatedRows, updatedRows] = await Upgrades.update(
      {
        tier: req.body.tier,
        jewels: req.body.jewels
      },
      {
        where: { id: id }
      }
    );
    if (numUpdatedRows === 1) {
      res.send(updatedRows[0]);
    } else {
      res.send({
        message: `Cannot update Upgrade with id=${id}. Maybe Upgrade was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating Upgrade with id=${id}`
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
