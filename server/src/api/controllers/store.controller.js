const httpStatus = require('http-status');
const { omit } = require('lodash');
const Store = require('../models/store.model');
const User = require('../models/user.model');
const { handler: errorHandler } = require('../middlewares/error');
const shopify = require('../services/shopifyClient')
const axios = require('axios')
const mongoose = require('mongoose');
/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  let session = null
  try {
    const body = req.body

    const auth0User_resp = await axios('https://starchain.auth0.com/userinfo', {
      headers: {
        Authorization: req.headers.authorization
      }
    })
    const auth0User = auth0User_resp.data
    const products = await shopify.product.list()
    const productIds = products.map(product => product.id)

    // TODO: need a better mechanism to select if photos
    const igToken = body.social_data.access_token
    console.log(igToken)

    const igMediaResp = await axios('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + igToken, {mode: 'cors'})
    const igMedia = igMediaResp.data.data
    session = await mongoose.startSession()
    session.startTransaction()

    const store = new Store({
      store_name: body.store_name,
      products: productIds,
      interests: body.interests,
      cover_photo: igMedia[0],
      social_data: {
        ig: body.social_data
      },
      user: auth0User.sub
    });
    const savedStore = await store.save();

    const user = await User.findByIdAndUpdate(auth0User.sub, {
      $push: { stores: body.store_name }
    })

    await session.commitTransaction()

    res.status(httpStatus.CREATED);
    res.json(savedStore.toObject());

  } catch (error) {
    if (session) {
      session.abortTransaction()
    }
    next(Store.checkDuplicateStoreName(error));
  }
};
