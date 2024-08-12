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

/*const getStudents = async (req, res) => {
    return pool.query("SELECT * FROM student ORDER BY id");
}*/

const getStudents = async (req, res) => {
    return pool.query(`
        SELECT s.*, c.grade, c.section, l.lesson, sln.notes
        FROM student s
                 JOIN classes c ON s.class_id = c.id
                 LEFT JOIN student_lessons_notes sln ON s.id = sln.student_id
                 LEFT JOIN lessons l ON sln.lesson_id = l.l_id
        ORDER BY s.id;
    `);
}

const getLessons = async (req, res) => {
    return pool.query("SELECT fname, lname, lesson FROM teacher ORDER BY lesson");
};

const getClasses = async (req, res) => {
    return pool.query("SELECT * FROM classes ORDER BY id");
};


 //Teacher should only see his own class notes
const getNotes = async (req, res) => {
    return pool.query("SELECT * FROM student_lessons_notes ORDER BY id");
};

const addStudent = async ({fname, lname, password, email, b_date, class_id, role_id}) => {
    return pool.query("INSERT INTO student (fname, lname, password, email, b_date, class_id, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7)", [fname, lname, password, email, b_date, class_id, role_id]);
};

const addClass = async ({grade, section}) => {
    return pool.query("INSERT INTO classes (grade, section) VALUES ($1, $2)", [grade, section]);
};

//Might update later
const addNotes= async ({student_id, teacher_id, lesson_id, notes}) => {
    return pool.query("INSERT INTO student_lessons_notes (student_id, lesson_id, teacher_id, notes) VALUES ($1, $2, $3, $4)", [student_id, teacher_id, lesson_id, notes]);
};

/*const updateStudent = async ({fname, lname, password, email, b_date, class_id, role_id, id}) => {
    return pool.query("UPDATE student SET fname = $1, lname = $2, password = $3, email = $4, b_date = $5, lass_id = $6, role_id = $7 WHERE id = $8", [fname, lname, password, email, b_date, class_id, role_id, parseInt(id)]);
}*/

const updateClass = async ({grade, section, id}) => {
    return pool.query("UPDATE classes SET grade = $1, section = $2 WHERE id = $3", [grade, section, parseInt(id)]);
}

//Might update Later
const updateNotes = async ({student_id, teacher_id, lesson_id, notes, id}) => {
    return pool.query("UPDATE student_lessons_notes SET student_id = $1, teacher_id = $2, lesson_id = $3, notes = $4 WHERE id = $5", [student_id, teacher_id, lesson_id, notes, parseInt(id)]);
}

const deleteStudent = async (id) => {
    return pool.query("DELETE FROM student WHERE id = $1", [id])
}

const deleteClass = async (id) => {
    return pool.query("DELETE FROM classes WHERE id = $1", [id])
}

const deleteNotes = async (id) => {
    return pool.query("DELETE FROM student_lessons_notes WHERE id = $1", [id])
}

// In Future Get Students by Class, update class lessons or teachers, notes, sum of notes for class

module.exports = {
    getStudents,
    getLessons,
    getClasses,
    getNotes,
    addStudent,
    addClass,
    addNotes,
    updateClass,
   // updateStudent,
    updateNotes,
    deleteStudent,
    deleteClass,
    deleteNotes,
    authenticateTeacher,
    getTeacherByEmail
}