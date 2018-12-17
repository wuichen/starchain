const httpStatus = require('http-status');
const { omit } = require('lodash');
const Store = require('../models/store.model');
const { handler: errorHandler } = require('../middlewares/error');
const shopify = require('../services/shopifyClient')

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const body = req.body
    // const resp = await fetch('https://starchainxz.auth0.com/userinfo', {
    //   headers: {
    //     Authorization: 'Bearer ' + req.headers.authorization
    //   }
    // })

    // const data = await resp.json()
    console.log(req.headers.authorization)
    // const products = await shopify.product.list()
    // const store = new Store({
    //   store_name: body.store_name,
    //   products,
    //   interests: body.interests,
    //   social_data: {
    //     ig: body.social_data
    //   }
    // });
    // const savedStore = await store.save();
    // res.status(httpStatus.CREATED);
    // res.json(savedStore.toObject());
    res.send('yes!')
  } catch (error) {
    next(Store.checkDuplicateStoreName(error));
  }
};
