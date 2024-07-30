const Pool = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "myscasdasda",
    host: "localhost",
    port: 5432,
    database: "my-db"
})

module.exports = pool;