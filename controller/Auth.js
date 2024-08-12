const { User } = require('../model/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sec = 'Sec';
exports.createUser = async (req, res) => {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        const user = new User({
          ...req.body,
          password: hashedPassword,
          salt,
        });
        const response = await user.save();
        req.login(response, function (err) {
          if (err) {
            res.status(400).json(err);
          } else {
            let token = jwt.sign(
              { id: response.id, email: response.email },
              sec
            );
            res
              .cookie('jwt', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json(token);
          }
        });
      }
    );
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.loginUser = async (req, res) => {
  console.log(req.user, 'loginusertoken');
  res
    .cookie('jwt', req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};
exports.fetchLogout = async (req, res) => {
  res
    .cookie('jwt', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};
exports.checkuser = async (req, res) => {
  if (req.user) {
    console.log(req.user, 'checkuser');
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
