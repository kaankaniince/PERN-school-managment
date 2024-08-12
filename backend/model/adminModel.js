const pool = require('../db');
const bcrypt = require("bcrypt");

const authenticateAdmin = async (username, password) => {
    const result = await pool.query("SELECT * FROM admin WHERE username = $1", [username]);
    if (result.rows.length > 0) {
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;
    }
    return null;

};

const getAdminByUsername = async (username) => {
    try {
        const result = await pool.query("SELECT * FROM admin WHERE username = $1", [username]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching admin by username:', error);
        throw error;
    }
};

const getAdmins = async (req, res) => {
    return pool.query("SELECT * FROM admin ORDER BY id");
};

const getTeachers = async (req, res) => {
    return pool.query("SELECT * FROM teacher ORDER BY id");
}

/*const getStudents = async (req, res) => {
    return pool.query("SELECT * FROM student ORDER BY id");
}*/

const getStudents = async (req, res) => {
    return pool.query(`
        SELECT s.*, c.grade, c.section
        FROM student s
                 LEFT JOIN classes c ON s.class_id = c.id
        ORDER BY s.id;
    `);
}

const getClasses = async (req, res) => {
    return pool.query("SELECT * FROM classes ORDER BY id");
}

const getClassAssignments = async (req, res) => {
    return pool.query(`
        SELECT ca.*,
               t.fname,
               t.lname,
               c.grade,
               c.section
        FROM class_assignments ca
                 JOIN
             teacher t ON ca.teacher_id = t.id
                 JOIN
             classes c ON ca.class_id = c.id
    `);
}
const addAdmin = async ({username, password, role_id}) => {
    return pool.query("INSERT INTO admin (username, password, role_id) VALUES ($1, $2, $3)", [username, password, role_id]);
}

const addTeacher = async ({fname, lname, email, password, lesson, role_id}) => {
    return pool.query("INSERT INTO teacher (fname, lname, email, password, lesson, role_id) VALUES ($1, $2, $3, $4, $5, $6)", [fname, lname, email, password, lesson, role_id]);
}

const addStudent = async ({fname, lname, password, email, b_date, class_id, role_id}) => {
    return pool.query("INSERT INTO student (fname, lname, password, email, b_date, class_id, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7)", [fname, lname, password, email, b_date, class_id, role_id]);
}

const addClass = async ({grade, section}) => {
    return pool.query("INSERT INTO classes (grade, section) VALUES ($1, $2)", [grade, section]);
}

const addClassAssignments = async ({teacher_id, class_id}) => {
    return pool.query("INSERT INTO class_assignments (teacher_id, class_id) VALUES ($1, $2)", [teacher_id, class_id]);
}

const deleteAdmin = async (id) => {
    return pool.query("DELETE FROM admin WHERE id = $1", [id])
}

const deleteTeacher = async (id) => {
    return pool.query("DELETE FROM teacher WHERE id = $1", [id])
}

const deleteStudent = async (id) => {
    return pool.query("DELETE FROM student WHERE id = $1", [id])
}

const deleteClass = async (id) => {
    return pool.query("DELETE FROM classes WHERE id = $1", [id])
}

const deleteClassAssignments = async (id) => {
    return pool.query("DELETE FROM class_assignments WHERE id = $1", [id])
}

const updateAdmin = async ({username, password, role_id, id}) => {
    return pool.query("UPDATE admin SET username = $1, password = $2, role_id = $3 WHERE id = $4", [username, password, role_id, parseInt(id)]);
}

const updateTeacher = async ({fname, lname, email, password, lesson, role_id, id}) => {
    return pool.query("UPDATE teacher SET fname = $1, lname = $2, email = $3, password = $4, lesson = $5, role_id = $6 WHERE id = $7", [fname, lname, email, password, lesson, role_id, parseInt(id)]);
}

const updateStudent = async ({fname, lname, password, email, b_date, class_id, role_id, id}) => {
    return pool.query("UPDATE student SET fname = $1, lname = $2, password = $3, email = $4, b_date = $5, class_id = $6, role_id = $7 WHERE id = $8", [fname, lname, password, email, b_date, class_id, role_id, parseInt(id)]);
}

const updateClass = async ({grade, section, id}) => {
    return pool.query("UPDATE classes SET grade = $1, section = $2 WHERE id = $3", [grade, section, parseInt(id)]);
}

const updateClassAssignments = async ({teacher_id, class_id, id}) => {
    return pool.query("UPDATE class_assignments SET teacher_id = $1, class_id = $2 WHERE id = $3", [teacher_id, class_id, parseInt(id)]);
}

module.exports = {
    getAdmins,
    getTeachers,
    getStudents,
    getClasses,
    getClassAssignments,
    addAdmin,
    addTeacher,
    addStudent,
    addClass,
    addClassAssignments,
    deleteAdmin,
    deleteTeacher,
    deleteStudent,
    deleteClass,
    deleteClassAssignments,
    updateAdmin,
    updateTeacher,
    updateStudent,
    updateClass,
    updateClassAssignments,
    authenticateAdmin,
    getAdminByUsername
}