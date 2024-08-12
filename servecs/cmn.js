const passport = require('passport');
exports.isAuth = (req, res, done) => {
  //   if (req.user) {
  //     return passport.authenticate('jwt');
  //     // console.log(req.user, 'isauth');
  //     // done();
  //   } else {
  //     res.json({ status: 'wrong' });
  //   }
  return passport.authenticate('jwt');
};
exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  //   token =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjEzNDcxMTc2NzJmYzVjZDRmMzZjMSIsImVtYWlsIjoibWluaGFqdGFwYWRlcjBAZ21haWwuY29tIiwiaWF0IjoxNzA2MTkwNTA0fQ.5f6UyFxQS8-oaY7_V0aR_NGT-VJJrOxX0R8M8EHFanc';
  return token;
};
