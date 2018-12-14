const actions = {
  CREATE_STORE_REQUEST: 'CREATE_STORE_REQUEST',
  CREATE_STORE_SUCCESS: 'CREATE_STORE_SUCCESS',
  CREATE_STORE_ERROR: 'CREATE_STORE_ERROR',
  SUBMIT_STORE_NAME: 'SUBMIT_STORE_NAME',
  FETCH_STORES: 'FETCH_STORES',
  SUBMIT_STORE_INTERESTS: 'SUBMIT_STORE_INTERESTS',
  LINK_SOCIAL:'LINK_SOCIAL',
  SUBMIT_STORE_REQUEST:'SUBMIT_STORE_REQUEST',
  SUBMIT_STORE_SUCCESS: 'SUBMIT_STORE_SUCCESS',
  SUBMIT_STORE_ERROR: 'SUBMIT_STORE_ERROR',
  submitStore: () => ({
    type: actions.SUBMIT_STORE_REQUEST
  }),
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
  submitInterests: (interests) => ({
    type: actions.SUBMIT_STORE_INTERESTS,
    payload: {
      interests
    }
  }),
  createStore: () => ({
    type: actions.CREATE_STORE_REQUEST
  })
};
export default actions;
