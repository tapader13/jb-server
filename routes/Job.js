const express = require('express');
const {
  createJobs,
  fetchJobs,
  fetchJobsTitle,
  fetchJobsSubCategories,
  fetchJoblistingByUser,
  fetchJobDltsById,
} = require('../controller/Job');
const { isAuth } = require('../servecs/cmn');
const passport = require('passport');
const router = express.Router();

router.post('/', isAuth(), createJobs);
router.get('/', fetchJobs);
router.get('/usr', isAuth(), fetchJoblistingByUser);
router.get('/details/:id', fetchJobDltsById);
// function isAuth(req, res, done) {
//   if (req.user) {
//     done();
//   } else {
//     res.json({ status: 'wrong' });
//   }
// }
exports.router = router;
