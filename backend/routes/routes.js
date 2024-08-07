const {Router} = require('express');
const router = new Router();
const adminController = require('../controller/adminController');
const studentController = require('../controller/studentController');
const teacherController = require('../controller/teacherController');
const authenticateToken = require('../middleware/authMiddleware')

// Admin Routes

// Get
router.get('/admins', adminController.getAdmins);
router.get('/teachers', adminController.getTeachers);
router.get('/students', adminController.getStudents);
router.get('/admin/:username', adminController.getAdminByUsername)

// Post
router.post('/add-admin', adminController.addAdmin);
router.post('/add-teacher', adminController.addTeacher);
router.post('/add-student', adminController.addStudent);

// Put
router.put('/update-admin', adminController.updateAdmin);
router.put('/update-teacher', adminController.updateTeacher);
router.put('/update-student', adminController.updateStudent);

// Delete
router.delete('/delete-admin/:id', adminController.deleteAdmin);
router.delete('/delete-teacher/:id', adminController.deleteTeacher);
router.delete('/delete-student/:id', adminController.deleteStudent);


// Student Routes

// Get
router.get('/notes', studentController.getNotes);
router.get('/sum-notes', studentController.getNotesSum);
router.get('/lessons', studentController.getLessons);
router.get('/student/:id', studentController.getStudentById)

// Teacher Routes

// Get. In future students for certain classes
router.get('/your-students', teacherController.getStudents)
router.get('/your-lesson', teacherController.getLessons)
router.get('/teacher/:email', teacherController.getTeacherByEmail)


// Post
router.post('/create-student', teacherController.addStudent);

// Put
//router.put('/update-notes', teacherController.updateNotes);
router.put('/updt-student', teacherController.updateStudent);

// Delete
router.delete('/dlt-student/:id', teacherController.deleteStudent);


// Register - Login

router.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
});

router.post('/student-login', studentController.authenticateStudent);
router.post('/register', studentController.registerStudent);

router.post('/login-teacher', teacherController.authenticateTeacher);

router.post('/login-admin', adminController.authenticateAdmin);



module.exports = router;