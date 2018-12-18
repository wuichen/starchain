const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

const storeSchema = new mongoose.Schema({
  store_name: {
    type: String,
    unique: true,
    required: true
  },
  interests: {
    type: Array
  },
  products: {
    type: Array
  },
  cover_photo: {
    type: Object
  },
  social_data: {
    ig: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  user: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});


/**
 * Methods
 */
storeSchema.method({

});

/**
 * Statics
 */
storeSchema.statics = {

  // roles,

  // /**
  //  * Get user
  //  *
  //  * @param {ObjectId} id - The objectId of user.
  //  * @returns {Promise<User, APIError>}
  //  */
  async get(id) {
    try {
      let store;

      // if (mongoose.Types.ObjectId.isValid(id)) {
      store = await this.findById(id).exec();
      // }
      if (store) {
        return store;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  checkDuplicateStoreName(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'store_name',
          location: 'body',
          messages: ['"store_name" already exists'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

};

/**
 * @typedef Store
 */
module.exports = mongoose.model('Store', storeSchema);
