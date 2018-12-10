const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  CALLBACK_IN_PROGRESS: 'CALLBACK_IN_PROGRESS',
  callbackLoading: () => ({type: actions.CALLBACK_IN_PROGRESS}),
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: payload => ({
    type: actions.LOGIN_REQUEST,
    payload
  }),
  logout: () => ({
    type: actions.LOGOUT
  }),
  handleAuthentication: (callback) => ({
    type: actions.LOGIN_REQUEST,
    callback
  })
};
export default actions;
