const pool = require('../db');
const bcrypt = require('bcrypt');

const registerStudent = async (fname, lname, email, password, b_date) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const role_id = 3;
    return pool.query(
        "INSERT INTO student (fname, lname, email, password, b_date, role_id) VALUES ($1, $2, $3, $4, $5, $6)", [fname, lname, email, hashedPassword, b_date, role_id]);
}

const authenticateStudent = async (id, password) => {
    const result = await pool.query("SELECT * FROM student WHERE id = $1", [id]);
    if (result.rows.length > 0) {
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;
    }
    return null;
};

const getStudentById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM student WHERE id = $1", [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        throw error;
    }
};

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
    getLessons,
    registerStudent,
    authenticateStudent,
    getStudentById
}