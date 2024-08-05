const pool = require("../db");
const teacherModel = require("../model/teacherModel");

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
   // updateNotes,
    updateStudent,
    deleteStudent
}