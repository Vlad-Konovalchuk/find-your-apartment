const express = require('express')
const router = express.Router();
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
    const userDTO = pickData(req.body, ["firstName", "lastName", "email"])
    const data = await db.User.create(userDTO);
    res.json({msg: 'User created', data})
  } catch (e) {
    throw new Error(e)
  }
});
router.post('/signin', async (req, res) => {
    try {
      const userDTO = pickData(req.body, ["email", "password"])
      const user = await db.User.findOne({
        where: {email: userDTO.email},
      });
      if (!user) {
        return res.status(404).json({msg: 'Wrong credential'})
      }

      if (!await user.checkPassword(userDTO.password)) {
        return res.status(404).json({msg: 'Wrong credential'})
      }

      res.json({msg: 'User is exist', data: user})
    } catch (e) {
      throw new Error(e)
    }
  }
);
router.delete('/delete-account', (req, res) => res.json({msg: 'Auth endpoint'}));
router.put('/update-account', (req, res) => res.json({msg: 'Auth endpoint'}));

module.exports = router
