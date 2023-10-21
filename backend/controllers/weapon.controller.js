const db = require("../models");
const Weapon = db.weapons;
const Op = db.Sequelize.Op;

// Create and Save a new Weapon
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type || !req.body.element || !req.body.monster) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Weapon
  const weapon = {
    type: req.body.type,
    element: req.body.element,
    monster: req.body.monster,
    filename: req.file ? req.file.filename : ""
  }

  // Save Weapon in the database
  Weapon.create(weapon).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the weapon"
    })
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Weapon.findByPk(id)
    .then(weapon => {
      if (!weapon) {
        return res.status(404).send({
          message: `Weapon not found with id ${id}.`
        });
      }

      const oldFilename = weapon.filename;

      const updatedWeapon = {
        id: req.body.id,
        type: req.body.type,
        element: req.body.element,
        monster: req.body.monster,
        filename: req.file ? req.file.filename : oldFilename
      };

      Weapon.update(updatedWeapon, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            // Si se actualiza correctamente y la imagen ha cambiado, elimina la imagen anterior
            if (req.file && oldFilename) {
              const filePath = path.join(__dirname, '../public/images', oldFilename);
              fs.unlink(filePath, err => {
                if (err) {
                  console.error('Error deleting old file', err);
                } else {
                  console.log('Old file deleted successfully');
                }
              });
            }
            res.send(num);
          } else {
            res.status(404).send({
              message: `Cannot update Weapon with id=${id}. Maybe Weapon was not found.`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not update Weapon with id=" + id
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Error retrieving Weapon with id=${id}`
      });
    });
};


// Retrieve all Weapons from the database.
exports.findAll = (req, res) => {
  Weapon.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Weapons"
    })
  })
};

// Find a single Weapon with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Weapon.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Error retrieving Weapon with id=${id}`
      });
    });
};


const fs = require('fs');
const path = require('path');

// Delete a Weapon with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Weapon.findByPk(id)
    .then(weapon => {
      if (!weapon) {
        return res.status(404).send({
          message: `Weapon not found with id ${id}.`
        });
      }

      const filename = weapon.filename;

      // Elimina el registro del arma
      return Weapon.destroy({
        where: { id: id }
      }).then(num => {
        if (num === 1) {
          // Si se elimina correctamente, también elimina el archivo
          if (filename) {
            const filePath = path.join(__dirname, '../public/images', filename);
            fs.unlink(filePath, err => {
              if (err) {
                console.error('Error deleting file', err);
              } else {
                console.log('File deleted successfully');
              }
            });
          }

          res.send({
            message: 'Weapon and corresponding image were deleted successfully!'
          });
        } else {
          res.send({
            message: `Cannot delete Weapon with id=${id}. Maybe Weapon was not found!`
          });
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Error retrieving Weapon with id=${id}`
      });
    });
};

