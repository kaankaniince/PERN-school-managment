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

// Delete
router.delete('/delete-admin/:id', adminController.deleteAdmin);
router.delete('/delete-teacher/:id', adminController.deleteTeacher);
router.delete('/delete-student/:id', adminController.deleteStudent);


// Student Routes
router.get('/notes', studentController.getNotes);

module.exports = router;