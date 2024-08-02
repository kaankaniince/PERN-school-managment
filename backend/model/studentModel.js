const pool = require('../db');

const getNotes = async (req,res) => {
    return  pool.query("SELECT lesson,notes FROM student ORDER BY lesson");
};

module.exports = {
    getNotes,
}