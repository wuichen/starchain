import actions from './actions';

const initState = { user: null, newUser: false, loading: false, errorMessage: false};

export default function userReducer(state = initState, action) {
  switch (action.type) {
  	case actions.GET_USER_REQUEST:
      return { ...state, loading: true };
    case actions.GET_USER_SUCCESS:
      return { ...state, user: action.payload.user, newUser: action.payload.newUser, loading: false };
    case actions.GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: 'There is a loading problem',
      };
    default:
      return state;
  }
}
