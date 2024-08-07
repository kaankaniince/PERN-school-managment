const pool = require("../db");
const teacherModel = require("../model/teacherModel");
const jwt = require("jsonwebtoken");

const authenticateTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await teacherModel.authenticateTeacher(email, password);
        if (user) {
            const token = jwt.sign({ email: user.email, role: user.role_id }, '9a78cd3ea8e4f710862a5ff757eabe16d78111a8e220280b76ba26bbd4d6db2d', { expiresIn: '1h' });
            res.status(200).json({ status: true, access_token: token });
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred during login");
    }
};

const getTeacherByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const teacher = await teacherModel.getTeacherByEmail(email);
        if (teacher) {
            res.status(200).json({ user: teacher })
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (err) {
        console.error('Error fetching teacher by email:', err);
        res.status(500).json({ message: 'Error fetching teacher by email', error: err.message });
    }
};

const getStudents = async (req, res) => {
    try {
        const getStudents = await teacherModel.getStudents();
        res.status(200).json(getStudents.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while getting the students");
    }
}

const getLessons = async (req, res) => {
    try {
        const getLessons = await teacherModel.getLessons();
        res.status(200).json(getLessons.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while getting the lessons");
    }
}

const addStudent = async (req, res) => {
    try {
        const addStudent = await teacherModel.addStudent(req.body);
        res.status(201).json(addStudent);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while adding the student");
    }
}

const updateStudent = async (req, res) => {
    try {
        const updateStudent = await teacherModel.updateStudent(req.body);
        res.status(200).send(updateStudent)
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the student");
    }
}

/*const updateNotes = async (req, res) => {
    try {
        const updateStudent = await teacherModel.updateStudent(req.body);
        res.status(200).send(updateStudent)
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the student");
    }
}*/

const deleteStudent = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deleteStudent = await teacherModel.deleteStudent(id)
        res.status(204).send(deleteStudent);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting the student");
    }
}

module.exports = {
    getStudents,
    getLessons,
    addStudent,
   //updateNotes,
    updateStudent,
    deleteStudent,
    authenticateTeacher,
    getTeacherByEmail
}