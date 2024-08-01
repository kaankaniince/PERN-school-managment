const pool = require('../db');

const getAdmins = async (req,res) => {
    return  pool.query("SELECT * FROM admin ORDER BY id");
};

module.exports = {
    getAdmins,
}