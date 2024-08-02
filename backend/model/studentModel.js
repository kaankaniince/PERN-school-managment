const pool = require('../db');

const getNotes = async (req,res) => {
    return  pool.query("SELECT lesson,notes FROM student ORDER BY lesson");
};

// Sum of Notes. More specific in future.
// With more lesson sum makes more sense

const getNotesSum = async (req,res) => {
    return  pool.query("SELECT fname, lname, SUM(notes) AS \"sum_of_notes\" FROM student GROUP BY fname, lname ORDER BY fname");
};

// Lessons. More specific in future. Getting lessons for your id

const getLessons = async (req,res) => {
    return  pool.query("SELECT lesson FROM lessons ORDER BY lesson");
};

module.exports = {
    getNotes,
    getNotesSum,
    getLessons
}