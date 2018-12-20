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
    const products = await shopify.product.list({
      ids: '1972728266821, 1972677247045, 1927848558661'
    })
    const productIds = products.map(product => product.id)

    // TODO: need a better mechanism to select if photos
    const igToken = body.social_data.access_token
    console.log(igToken)

    const igMediaResp = await axios('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + igToken, {mode: 'cors'})
    const igMedia = igMediaResp.data.data
    session = await mongoose.startSession()
    session.startTransaction()
    const store = {
      store_name: body.store_name,
      products: productIds,
      interests: body.interests,
      cover_photo: igMedia[0],
      social_data: {
        ig: body.social_data
      },
      user: req.user.sub
    }
    const savedStore = await Store.create([store], { session: session });

    // const store = new Store({
    //   store_name: body.store_name,
    //   products: productIds,
    //   interests: body.interests,
    //   cover_photo: igMedia[0],
    //   social_data: {
    //     ig: body.social_data
    //   },
    //   user: req.user.sub
    // });
    // const savedStore = await store.save();

    const user = await User.findByIdAndUpdate(req.user.sub, {
      $push: { store_names: body.store_name }
    }, { session: session })

    await session.commitTransaction()

    res.status(httpStatus.CREATED);
    res.json(store);

  } catch (error) {
    if (session) {
      session.abortTransaction()
    }
    next(Store.checkDuplicateStoreName(error));
  }
};
