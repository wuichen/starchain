const httpStatus = require('http-status');
const { omit } = require('lodash');
const { handler: errorHandler } = require('../middlewares/error');
const { shopify_store_domain, shopify_store_accessToken } = require('../../config/vars');
const Store = require('../models/store.model')
const ShopifyAPIClient = require('shopify-api-node');
const shopify = new ShopifyAPIClient({ shopName: shopify_store_domain, accessToken: shopify_store_accessToken });


/**
 * Load product and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {

  } catch (error) {
    console.log(error)
    return errorHandler(error, req, res);
  }
};

/**
 * Get product
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user);

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const user = req.user
    const store_names = user.store_names
    const product_ids = []

    if (req.query.store_name) {
      const store_name = req.query.store_name
      if (store_name === 'all') {
        for (var i = 0; i < store_names.length; i++) {
          const this_store_name = store_names[i]
          const stores = await Store.find({store_name: this_store_name})
          const store = stores[0]
          for (var j = 0; j < store.products.length; j++) {
            product_ids.push(store.products[j])
          }
        }
      } else {
        const store = stores.filter(store.store_name === store_name)
        for (var k = 0; k < store.products.length; k++) {
           product_ids.push(store.products[k])
         } 
      }
    } else {
      // TODO: need to figure out no query param case
      // const products = await shopify.product.list()
      // result = products
    }

    const products = await shopify.product.list({
      ids: product_ids.toString()
    })

    res.json(products);
  } catch (error) {
    next(error);
  }
};
