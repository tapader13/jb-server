const express = require('express');
const { createSalary, fetchSalary } = require('../controller/Salary');
const router = express.Router();

router.post('/', createSalary);
router.get('/', fetchSalary);

exports.router = router;
