const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

/* GET users listing. */
router.get('/', userController.getAll);
router.get('/create/', userController.create);

module.exports = router;
