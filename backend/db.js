const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my-db',
    password: 'myscasdasda',
    port: 5432
});

module.exports = pool;