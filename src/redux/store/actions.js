const actions = {
  CREATE_STORE_REQUEST: 'CREATE_STORE_REQUEST',
  CREATE_STORE_SUCCESS: 'CREATE_STORE_SUCCESS',
  CREATE_STORE_ERROR: 'CREATE_STORE_ERROR',
  SUBMIT_STORE_NAME: 'SUBMIT_STORE_NAME',
  FETCH_STORES: 'FETCH_STORES',
  SUBMIT_STORE_INTERESTS: 'SUBMIT_STORE_INTERESTS',
  LINK_SOCIAL:'LINK_SOCIAL',
  linkSocial: (socialData) => ({
    type: actions.LINK_SOCIAL,
    payload: {
      socialData
    }
  }),
  submitStoreName: (storeName) => ({
    type: actions.SUBMIT_STORE_NAME,
    payload: {
      storeName
    }
  }),
  submitStoreName: (interests) => ({
    type: actions.SUBMIT_STORE_INTERESTS,
    payload: {
      interests
    }
  }),
  createStore: (store) => ({
    type: actions.CREATE_STORE_REQUEST,
    payload: {
      store
    }
  })
};
export default actions;
