module.exports = {
  HOST: "192.168.0.99",
  USER: "postgres",
  PASSWORD: "redhat6",
  DB: "testdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
