const pool = require("../db");
const studentModel = require("../model/studentModel");

const getNotes = async (req, res) => {
    try {
        const get = await studentModel.getNotes();
        res.status(200).json(get.rows);
    }catch (err){
        console.log(err);
        res.status(500).send("An error occurred while getting the notes");
    }
}

module.exports = {
    getNotes,
}