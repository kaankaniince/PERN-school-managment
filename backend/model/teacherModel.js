const pool = require('../db');
const bcrypt = require("bcrypt");

const authenticateTeacher = async (email, password) => {
    const result = await pool.query("SELECT * FROM teacher WHERE email = $1", [email]);
    if (result.rows.length > 0) {
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;
    }
    return null;
};

const getTeacherByEmail = async (email) => {
    try {
        const result = await pool.query("SELECT * FROM teacher WHERE email = $1", [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching teacher by email:', error);
        throw error;
    }
};

const getStudents = async (req, res) => {
    return pool.query("SELECT * FROM student ORDER BY id");
}

const getLessons = async (req, res) => {
    return pool.query("SELECT fname, lname, lesson FROM teacher ORDER BY lesson");
};

const getClasses = async (req, res) => {
    return pool.query("SELECT * FROM classes ORDER BY id");
};

const addStudent = async ({fname, lname, password, email, b_date, lesson, notes, class_id, role_id}) => {
    return pool.query("INSERT INTO student (fname, lname, password, email, b_date, lesson, notes, class_id, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [fname, lname, password, email, b_date, lesson, notes, class_id, role_id]);
};

const addClass = async ({grade, section}) => {
    return pool.query("INSERT INTO classes (grade, section) VALUES ($1, $2)", [grade, section]);
};

/*const updateStudent = async ({fname, lname, password, email, b_date, lesson, notes, class_id, role_id, id}) => {
    return pool.query("UPDATE student SET fname = $1, lname = $2, password = $3, email = $4, b_date = $5, lesson = $6, notes = $7, class_id = $8, role_id = $9 WHERE id = $10", [fname, lname, password, email, b_date, lesson, notes, class_id, role_id, parseInt(id)]);
}*/

const updateNotes = async ({fname, lname, lesson, notes, id}) => {
    return pool.query("UPDATE student SET fname = $1, lname = $2, lesson = $3, notes = $4 WHERE id = $5", [fname, lname, lesson, notes, parseInt(id)]);
}

const updateClass = async ({grade, section, id}) => {
    return pool.query("UPDATE classes SET grade = $1, section = $2 WHERE id = $3", [grade, section, parseInt(id)]);
}


const deleteStudent = async (id) => {
    return pool.query("DELETE FROM student WHERE id = $1", [id])
}

const deleteClass = async (id) => {
    return pool.query("DELETE FROM classes WHERE id = $1", [id])
}

// In Future Get Students by Class, update class lessons or teachers, notes, sum of notes for class

module.exports = {
    getStudents,
    getLessons,
    getClasses,
    addStudent,
    addClass,
    updateNotes,
    updateClass,
   // updateStudent,
    deleteStudent,
    deleteClass,
    authenticateTeacher,
    getTeacherByEmail
}