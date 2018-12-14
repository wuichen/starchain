const httpStatus = require('http-status');
const { omit } = require('lodash');
const Store = require('../models/store.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    // const store = new Store(req.body);
    // const savedStore = await store.save();
    // res.status(httpStatus.CREATED);
    // res.json(savedStore.toObject());
    res.send('working')
  } catch (error) {
    next(Store.checkDuplicateStoreName(error));
  }
};
