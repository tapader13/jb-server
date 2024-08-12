const express = require('express');
const { createContact } = require('../controller/Contact');
const router = express.Router();

router.post('/', createContact);

exports.router = router;
