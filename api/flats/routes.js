const express = require('express')
const router = express.Router();
const passport = require('passport');
require('../../services/passport');
;
const models = require('../../models')
const uploadToCloudinary = require('../../utils/imageUploader')
const pickData = require('lodash/pick')
const formidable = require('formidable')

router.get('/', async (req, res) => {
  try {
    const data = await models.Flat.findAll({
      include: [
        {
          model: models.User,
          as: 'author',
          attributes: ["firstName", "lastName", "id"],
        }
      ]
    });
    res.json({status: 'OK', msg: "Get all flats", data})
  } catch (e) {
    throw new Error(e)
  }
});
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    const form = formidable({multiples: false});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return res.json({msg: "ERROR", data: err});
      }
      const flatDTO = pickData(fields, ["title", "description", "bathrooms", "bedrooms", "isDiscount", "price"])
      const {secure_url} = await uploadToCloudinary(files.image.path)
      flatDTO.image = secure_url
      flatDTO.userId = req.user.id
      const newFlat = await models.Flat.create(flatDTO);
      res.json({msg: 'Flat created', data: newFlat});
    });
  } catch (e) {
    throw new Error(e)
  }
});
module.exports = router
