module.exports = (sequelize, Sequelize) => {
  const Weapon = sequelize.define("weapon", {
    type: {
      type: Sequelize.STRING
    },
    element: {
      type: Sequelize.STRING
    },
    monster: {
      type: Sequelize.STRING
    },
    filename: {
      type: Sequelize.STRING
    }
  });

  return Weapon;
}