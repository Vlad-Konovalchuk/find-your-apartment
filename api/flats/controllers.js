/**
 * @api {get} /api/flats Get all flats
 * @apiName Get all flats
 * @apiPermission public
 * @apiGroup Flats
 *
 * @apiSuccess (200) {Object} mixed `Flat` object
 */
const getAllFlats = (req, res) => {
  try {

  } catch (e) {

  }
}
/**
 * @api {get} /api/flats/:id
 * @apiName Get flat by id
 * @apiPermission public
 * @apiGroup Flats
 * @apiParam {Number} id Users unique ID.
 */
const getOneFlat = (req, res) => {
  try {

  } catch (e) {

  }
}
/**
 * @api {post} /api/flats Create new flat
 * @apiName Create flat
 * @apiPermission protected
 * @apiGroup Flats
 *
 * @apiParam  {String} [title] Title
 * @apiParam  {String} [description] Description
 * @apiParam  {String} [bathrooms] Bathrooms
 * @apiParam  {String} [bedrooms] Bedrooms
 * @apiParam  {File} [image] Image
 *
 * @apiSuccess (200) {Object} mixed `Flat` object
 */
const createFlat = (req, res) => {
  try {

  } catch (e) {

  }
}
/**
 * @api {POST} /api/flats Delete flat
 * @apiName Delete flat
 * @apiPermission protected
 * @apiGroup Flats
 *
 * @apiParam  {String} [title] Title
 * @apiParam  {String} [description] Description
 * @apiParam  {String} [bathrooms] Bathrooms
 * @apiParam  {String} [bedrooms] Bedrooms
 * @apiParam  {File} [image] Image
 *
 * @apiSuccess (200) {Object} mixed `Flat` object
 */
const updateFlat = (req, res) => {
  try {

  } catch (e) {

  }
}
/**
 * @api {DELETE} /api/flats Delete flat
 * @apiName Delete flat
 * @apiPermission protected
 * @apiGroup Flats
 *
 * @apiParam  {String} [id] ID
 *
 * @apiSuccess (200) {String}
 */
const deleteFlat = (req, res) => {
  try {

  } catch (e) {

  }
}

module.exports = {
  getAllFlats,
  createFlat,
  updateFlat,
  deleteFlat
}
