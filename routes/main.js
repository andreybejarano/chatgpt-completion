const express = require('express');

const mainController = require('../controllers/main');

const router = express.Router();

router.post('/', mainController.index);

module.exports = router;