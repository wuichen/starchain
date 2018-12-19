const httpStatus = require('http-status');
const { omit } = require('lodash');
const { handler: errorHandler } = require('../middlewares/error');
const { shopify_store_domain, shopify_store_accessToken } = require('../../config/vars');

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
    const products = await shopify.product.list()
    res.json(products);
  } catch (error) {
    next(error);
  }
};
