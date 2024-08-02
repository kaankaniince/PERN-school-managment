const pool = require("../db");
const studentModel = require("../model/studentModel");

const getNotes = async (req, res) => {
    try {
        const getNotes = await studentModel.getNotes();
        res.status(200).json(getNotes.rows);
    }catch (err){
        console.log(err);
        res.status(500).send("An error occurred while getting the notes");
    }
}

const getNotesSum = async (req, res) => {
    try {
        const getNotesSum = await studentModel.getNotesSum();
        res.status(200).json(getNotesSum.rows);
    }catch (err){
        console.log(err);
        res.status(500).send("An error occurred while getting the sums of notes");
    }
}

const getLessons = async (req, res) => {
    try {
        const getLessons = await studentModel.getLessons();
        res.status(200).json(getLessons.rows);
    }catch (err){
        console.log(err);
        res.status(500).send("An error occurred while getting the lessons");
    }
}

module.exports = {
    getNotes,
    getNotesSum,
    getLessons
}