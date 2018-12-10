import actions from './actions';

const initState = { idToken: null, loading: false };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { ...state, idToken: action.token, loading: false };
    case actions.LOGOUT:
      return initState;
    case actions.CALLBACK_IN_PROGRESS:
      return { ...state, loading: true };
    default:
      return state;
  }
}
