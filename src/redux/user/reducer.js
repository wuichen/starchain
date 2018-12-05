import actions from './actions';

const initState = { user: null, loading: false, errorMessage: false };

export default function userReducer(state = initState, action) {
  switch (action.type) {
  	case actions.GET_USER_REQUEST:
      return { ...state, loading: true };
    case actions.GET_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case actions.GET_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    default:
      return state;
  }
}
