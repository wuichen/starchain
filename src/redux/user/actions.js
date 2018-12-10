const actions = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_ERROR: 'GET_USER_ERROR',
  getUser: () => ({
    type: actions.GET_USER_REQUEST
  }),
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
  updateUser: (payload) => ({
    type: actions.UPDATE_USER_REQUEST,
    payload
  }),
  CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_ERROR: 'CREATE_USER_ERROR',
  createUser: (payload) => ({
    type: actions.CREATE_USER_REQUEST,
    payload
  }),
};
export default actions;