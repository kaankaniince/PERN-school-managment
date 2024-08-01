const pool = require("../db");
const adminModel = require("../model/adminModel");

const getAdmins = async (req, res) => {
    try {
        const get = await adminModel.getAdmins();
        res.status(200).json(get.rows);
    }catch (err){
        console.log(err);
        res.status(500).send("An error occurred while getting the admins");
    }
}

module.exports = {
    getAdmins,
}