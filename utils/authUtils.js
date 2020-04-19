const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

async function generateToken({id, email}) {
  try {
    const t = await jwt.sign({id, email}, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });
    return t
  } catch (e) {
    throw new Error(e)
  }
}

function comparePasswords(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) reject(err)
      resolve(res)
    });
  })
}

function cryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 15, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })
}

module.exports = {
  cryptPassword,
  generateToken,
  comparePasswords
}
