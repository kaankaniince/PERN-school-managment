const { Router } = require('express');
const router = new Router();
const adminController = require('../controller/adminController');

//router

router.get('/', adminController.getAdmins);

module.exports = router;