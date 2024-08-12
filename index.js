//imports default
require('dotenv').config();
const { isAuth, cookieExtractor } = require('./servecs/cmn');

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const path = require('path');
const server = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const sec = 'Sec';
const { User } = require('./model/User');

//jwt -options
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = sec;

//middlewares
// server.use(express.static(path.resolve(__dirname, 'build')));
server.use(express.static('build'));

server.use(
  cors({
    exposedHeaders: ['total'],
  })
);
server.use(cookieParser());
server.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate('session'));
//api call
const authApi = require('./routes/Auth');
const contactApi = require('./routes/Contact');
const subCategorieApi = require('./routes/SubCategorie');
const locationApi = require('./routes/Location');
const salaryApi = require('./routes/Salary');
const workExpApi = require('./routes/WorkExperience');
const jobApi = require('./routes/Job');

server.use(express.json());
server.use('/auth', authApi.router);
server.use('/contacts', contactApi.router);
server.use('/subCategories', subCategorieApi.router);
server.use('/location', locationApi.router);
server.use('/salary', salaryApi.router);
server.use('/Workexperience', workExpApi.router);
server.use('/jobs', jobApi.router);
//session
passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email' }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();

      if (!user) {
        console.log('no user found');
        done(null, false, { message: 'no user found' });
      } else {
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          'sha256',
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              done(null, false, { message: 'no pass found' });
            } else {
              let token = jwt.sign({ id: user.id, email: user.email }, sec);
              done(null, { id: user.id, email: user.email, token });
            }
          }
        );
      }
    } catch (error) {
      done(null, false, { message: 'catch err' });
    }
  })
);

//jwt strategy
passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        console.log(user, jwt_payload, 'jwt stragy');
        return done(null, { id: user.id, email: user.email });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  console.log(user, 'serializ');
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email });
  });
});
passport.deserializeUser(function (user, cb) {
  console.log(user, 'de-serializ');

  process.nextTick(function () {
    return cb(null, user);
  });
});
//connect mongoose
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('connect mongo');
}
// server.get('*', (req, res) => res.json({ status: 'route not found' }));
server.get('/', (req, res) => {
  res.json({ status: 'success' });
});

server.listen(port, () => console.log('server start'));
