const express = require('express');
const {
  createSubCategorie,
  fetchSubCategorie,
} = require('../controller/SubCategorie');
const router = express.Router();

router.post('/', createSubCategorie);
router.get('/', fetchSubCategorie);

exports.router = router;
