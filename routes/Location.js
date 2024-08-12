const express = require('express');
const { createLocation, fetchLocation } = require('../controller/Location');
const router = express.Router();

router.post('/', createLocation);
router.get('/', fetchLocation);

exports.router = router;
