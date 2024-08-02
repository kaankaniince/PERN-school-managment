const {Router} = require('express');
const router = new Router();
const adminController = require('../controller/adminController');
const studentController = require('../controller/studentController');

// Admin Routes

// Get
router.get('/admins', adminController.getAdmins);
router.get('/teachers', adminController.getTeachers);
router.get('/students', adminController.getStudents);

// Post
router.post('/add-admin', adminController.addAdmin);
router.post('/add-teacher', adminController.addTeacher);
router.post('/add-student', adminController.addStudent);

// Update
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


module.exports = router;