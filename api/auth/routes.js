const express = require('express')
const router = express.Router();
const passport = require('passport');
const db = require('../../models')
const pickData = require('lodash/pick')

router.get('/', async (req, res, next) => {
  try {
    const data = await db.User.findAll()
    res.json({msg: data})
  } catch (e) {
    throw new Error(e)
  }
});
router.post('/signup', async (req, res) => {
  try {
    const userDTO = pickData(req.body, ["firstName", "lastName", "email", "password"])
    const data = await db.User.create(userDTO);
    res.json({msg: 'User created', data})
  } catch (e) {
    throw new Error(e)
  }
});
router.post('/signin', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred')
        return next(error);
      }
      req.login(user, {session: false}, async (error) => {
        if (error) return next(error)
        try {
          const token = await user.generateToken();
          return res.json({
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            }, token
          });
        } catch (e) {
          return next(e);
        }
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
router.delete('/delete-account', (req, res) => res.json({msg: 'Auth endpoint'}));
router.put('/update-account', (req, res) => res.json({msg: 'Auth endpoint'}));

module.exports = router
