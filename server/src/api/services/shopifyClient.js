const { shopify_store_domain, shopify_store_accessToken } = require('../../config/vars');
const ShopifyAPIClient = require('shopify-api-node');
const shopify = new ShopifyAPIClient({ shopName: shopify_store_domain, accessToken: shopify_store_accessToken });
module.exports = shopify