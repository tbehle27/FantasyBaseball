const { Pool } = require("pg");
const dbUrl = process.env.DATABASE_URL;

module.exports = new Pool({
  connectionString: dbUrl
});