module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Danielkrtk12",
  DB: "db_bicycle_photos",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}