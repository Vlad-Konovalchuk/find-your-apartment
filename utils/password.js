const bcrypt = require('bcrypt')

function getPasswordHash(password) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

function comparePasswords(password, hash) {
/*  return bcrypt.compare(password, hash, (err, res) => {
    if (err) {
      console.error(err)
      throw new Error(err)
    }
    return res
  })*/
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
  comparePasswords
}
