import actions from './actions';

const initState = { user: null, newUser: false, loading: false, errorMessage: false};

export default function userReducer(state = initState, action) {
  switch (action.type) {
  	case actions.GET_USER_REQUEST:
    case actions.UPDATE_USER_REQUEST:
    case actions.CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case actions.GET_USER_ERROR:
    case actions.UPDATE_USER_ERROR:
    case actions.CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.GET_USER_SUCCESS:
      return { ...state, user: action.payload.user, newUser: action.payload.newUser, loading: false };
    case actions.UPDATE_USER_SUCCESS:
      return { ...state, user: action.payload.user, newUser: false, loading: false };
    case actions.CREATE_USER_SUCCESS:
      return { ...state, user: action.payload.user, newUser: false, loading: false };

    default:
      return state;
  }
}
