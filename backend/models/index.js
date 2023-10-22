const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.weapons = require("./weapon.model.js")(sequelize, Sequelize);
db.upgrades = require("./upgrades.model.js")(sequelize, Sequelize);

// Relación entre Upgrades y Weapons
db.upgrades.belongsTo(db.weapons, {
  foreignKey: "weaponId",
  as: "weapon",
  onDelete: 'CASCADE',
});

module.exports = db;
