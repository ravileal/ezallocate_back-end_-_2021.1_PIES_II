module.exports = () => {
  process.env.DB_HOST = "localhost";
  process.env.DB_PORT = "3306";
  process.env.DB_USERNAME = "root";
  process.env.DB_PASSWORD = "root";
  process.env.BD_NAME = "ezallocate";
  process.env.NODE_ENV = "test"
}
