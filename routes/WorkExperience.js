const express = require('express');
const { createWorkExp, fetchWorkExp } = require('../controller/WorkExperience');
const router = express.Router();

router.post('/', createWorkExp);
router.get('/', fetchWorkExp);

exports.router = router;
