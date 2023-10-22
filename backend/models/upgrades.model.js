module.exports = (sequelize, Sequelize) => {
    const Upgrades = sequelize.define("upgrades", {
      tier: {
        type: Sequelize.STRING
      },
      jewels: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false // Esta opción desactiva los campos createdAt y updatedAt
    });
  
    return Upgrades;
  };
  