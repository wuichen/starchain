const actions = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_ERROR: 'GET_USER_ERROR',
  getUser: payload => ({
    type: actions.GET_USER_REQUEST,
    payload
  }),
};
export default actions;
