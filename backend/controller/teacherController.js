const teacherModel = require("../model/teacherModel");
const jwt = require("jsonwebtoken");

const authenticateTeacher = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await teacherModel.authenticateTeacher(email, password);
        if (user) {
            const token = jwt.sign({
                email: user.email,
                role: user.role_id
            }, '9a78cd3ea8e4f710862a5ff757eabe16d78111a8e220280b76ba26bbd4d6db2d', {expiresIn: '1h'});
            res.status(200).json({status: true, access_token: token});
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
        const {email} = req.params;
        const teacher = await teacherModel.getTeacherByEmail(email);
        if (teacher) {
            res.status(200).json({user: teacher})
        } else {
            res.status(404).json({message: 'Teacher not found'});
        }
    } catch (err) {
        console.error('Error fetching teacher by email:', err);
        res.status(500).json({message: 'Error fetching teacher by email', error: err.message});
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

const getClasses = async (req, res) => {
    try {
        const getClasses = await teacherModel.getClasses();
        res.status(200).json(getClasses.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while getting the classes");
    }
}

const getTeacherStudentsNotes = async (req, res) => {
    try {
        const email = req.user.email
        const getTeacherStudentsNotes = await teacherModel.getTeacherStudentsNotes(email);
        res.status(200).json(getTeacherStudentsNotes.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while getting the classes");
    }
}

const getClassStudents = async (req, res) => {
    try {
        const email = req.user.email
        const getClassStudents = await teacherModel.getClassStudents(email);
        res.status(200).json(getClassStudents.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while getting the classes");
    }
}

const getSchedule = async (req, res) => {
    try {
        const email = req.user.email
        const getSchedule = await teacherModel.getSchedule(email);
        res.status(200).json(getSchedule.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while getting the schedule");
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

const addClass = async (req, res) => {
    try {
        const addClass = await teacherModel.addClass(req.body);
        res.status(201).json(addClass);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while adding the class");
    }
}

const addNotes = async (req, res) => {
    try {
        const addNotes = await teacherModel.addNotes(req.body);
        res.status(201).json(addNotes);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while adding the class");
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

const updateClass = async (req, res) => {
    try {
        const updateClass = await teacherModel.updateClass(req.body);
        res.status(200).send(updateClass)
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the class");
    }
}

const updateSchedule = async (req, res) => {
    try {
        const updateSchedule = await teacherModel.updateSchedule(req.body);
        res.status(200).send(updateSchedule)
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the schedule");
    }
}

/*const updateNotes = async (req, res) => {
    try {
        const { notes, student_id, lesson_id } = req.body;
        const email = req.user.email; // Öğretmenin e-posta adresini `req.user` üzerinden al

        const result = await teacherModel.updateNotes({ notes, student_id, lesson_id, email });
        res.status(200).send(result);
    } catch (error) {
        console.error('Error in updateNotes controller:', error);
        res.status(500).send("An error occurred while updating the notes");
    }
};*/

const upsertNotes = async (req, res) => {
    try {
        const { notes, student_id, lesson_id, teacher_id } = req.body;
        const result = await teacherModel.upsertNotes({ notes, student_id, lesson_id, teacher_id });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in updateNotes controller:', error);
        res.status(500).send("An error occurred while updating the grade");
    }
};



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

const deleteClass = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deleteClass = await teacherModel.deleteClass(id)
        res.status(204).send(deleteClass);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting the class");
    }
}

const deleteNotes = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deleteNotes = await teacherModel.deleteNotes(id)
        res.status(204).send(deleteNotes);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting the notes");
    }
}

const removeStudentClass = async (req, res) => {
    try {
        const removeStudentClass = await teacherModel.removeStudentClass(req.body);
        res.status(200).send(removeStudentClass)
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while removing the student class");
    }
}

const updateStudentClass = async (req, res) => {
    try {
        const updateStudentClass = await teacherModel.updateStudentClass(req.body);
        res.status(200).send(updateStudentClass)
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the student class");
    }
}

module.exports = {
    getStudents,
    getLessons,
    getClasses,
    getTeacherStudentsNotes,
    getClassStudents,
    getSchedule,
    addStudent,
    addClass,
    addNotes,
    updateStudent,
    updateClass,
    upsertNotes,
    deleteStudent,
    deleteClass,
    deleteNotes,
    authenticateTeacher,
    getTeacherByEmail,
    removeStudentClass,
    updateStudentClass,
    updateSchedule
}