require('dotenv').config();
const passport = require('passport')
const passportJWT = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;

const JWTStrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models').User

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    //Save the information provided by the user to the the database
    const user = await User.create({email, password});
    //Send the user information to the next middleware
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    //Find the user associated with the email provided by the user
    const user = await User.findOne({where: {email}})
    if (!user) {
      //If the user isn't found in the database, return a message
      return done(null, false, {message: 'User not found'});
    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await user.checkPassword(password);
    if (!validate) {
      return done(null, false, {message: 'Wrong Password'});
    }
    //Send the user information to the next middleware
    return done(null, user, {message: 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));
passport.use(new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}, async (token, cb) => {
  const user = await User.findOne({where: {id: token.id}})
  if (!user) return cb("Wrong token")
  return cb(null, user)
}));

module.exports = passport;
