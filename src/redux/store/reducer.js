import actions from './actions';

const initState = { stores: [], editing_store: {}, loading: false};

export default function storeReducer(state = initState, action) {
  switch (action.type) {
    case actions.SUBMIT_STORE_NAME:
      const store_name = action.payload.store_name
      return { 
        ...state,
        editing_store : {
          ...state.editing_store,
          store_name: store_name
        }
      };
    case actions.SUBMIT_INTERESTS:
      return { 
        ...state,
        editing_store : {
          ...state.editing_store,
          interests: action.payload.interests
        }
      };
    case actions.LINK_SOCIAL:
      const social_data = action.payload.social_data
      return { 
        ...state,
        editing_store : {
          ...state.editing_store,
          social_data: social_data
        }
      };
    default:
      return state;
  }
}
