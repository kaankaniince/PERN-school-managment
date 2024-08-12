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
    return  pool.query("SELECT l.lesson, sln.notes FROM student_lessons_notes sln JOIN lessons l ON sln.lesson_id = l.l_id ORDER BY l.lesson");
};

// Sum of Notes. More specific in future.
// With more lesson sum makes more sense

const getNotesSum = async (req, res) => {
    return  pool.query(`
        SELECT s.fname, s.lname, AVG(sln.notes) AS "avg_of_notes"
        FROM student s
        JOIN student_lessons_notes sln ON s.id = sln.student_id
        GROUP BY s.fname, s.lname
        ORDER BY s.fname
    `);
};

//Might use this in Future
/*const getNotes = async (req, res) => {
    const id = req.user.id; // Assuming you have set the authenticated user's ID in req.user

    try {
        const result = await pool.query(
            `SELECT l.lesson, sln.notes
            FROM student_lessons_notes sln
            JOIN lessons l ON sln.lesson_id = l.l_id
            WHERE sln.student_id = $1
            ORDER BY l.lesson`,
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};*/

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