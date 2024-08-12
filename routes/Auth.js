const express = require('express');
const passport = require('passport');
const {
  createUser,
  loginUser,
  fetchLogout,
  checkuser,
} = require('../controller/Auth');
const { isAuth } = require('../servecs/cmn');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', passport.authenticate('local'), loginUser);
router.get('/logout', fetchLogout);
router.get('/checkAuth', isAuth(), checkuser);

exports.router = router;
