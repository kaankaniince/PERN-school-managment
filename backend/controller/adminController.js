const pool = require("../db");
const adminModel = require("../model/adminModel");

const getAdmins = async (req, res) => {
    try {
        const getAdmins = await adminModel.getAdmins();
        res.status(200).json(getAdmins.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while getting the admins");
    }
}

const getTeachers = async (req, res) => {
    try {
        const getTeachers = await adminModel.getTeachers();
        res.status(200).json(getTeachers.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while getting the teachers");
    }
}

const getStudents = async (req, res) => {
    try {
        const getStudents = await adminModel.getStudents();
        res.status(200).json(getStudents.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while getting the students");
    }
}


const addAdmin = async (req, res) => {
    try {
        const addAdmin = await adminModel.addAdmin(req.body);
        res.status(201).json(addAdmin);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while adding the admin");
    }
}

const addTeacher = async (req, res) => {
    try {
        const addTeacher = await adminModel.addTeacher(req.body);
        res.status(201).json(addTeacher);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while adding the teacher");
    }
}

const addStudent = async (req, res) => {
    try {
        const addStudent = await adminModel.addStudent(req.body);
        res.status(201).json(addStudent);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while adding the student");
    }
}

const deleteAdmin = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deleteAdmin = await adminModel.deleteAdmin(id)
        res.status(204).send(deleteAdmin);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting the admin");
    }
}

const deleteTeacher = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deleteTeacher = await adminModel.deleteTeacher(id)
        res.status(204).send(deleteTeacher);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting the teacher");
    }
}

const deleteStudent = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deleteStudent = await adminModel.deleteStudent(id)
        res.status(204).send(deleteStudent);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting the student");
    }
}

const updateAdmin = async (req, res) => {
    try {
        const updateAdmin = await adminModel.updateAdmin(req.body);
        res.status(200).send(updateAdmin)
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the admin");
    }
}

const updateTeacher = async (req, res) => {
    try {
        const updateTeacher = await adminModel.updateTeacher(req.body);
        res.status(200).send(updateTeacher)
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the teacher");
    }
}

const updateStudent = async (req, res) => {
    try {
        const updateStudent = await adminModel.updateStudent(req.body);
        res.status(200).send(updateStudent)
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the student");
    }
}


module.exports = {
    getAdmins,
    getTeachers,
    getStudents,
    addAdmin,
    addTeacher,
    addStudent,
    deleteAdmin,
    deleteTeacher,
    deleteStudent,
    updateAdmin,
    updateTeacher,
    updateStudent
}