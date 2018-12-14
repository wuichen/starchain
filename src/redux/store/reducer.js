import actions from './actions';

const initState = { stores: [], editingStore: {}, loading: false};

export default function storeReducer(state = initState, action) {
  switch (action.type) {
    case actions.SUBMIT_STORE_NAME:
      const store_name = action.payload.store_name
      return { 
        ...state,
        editingStore : {
          ...state.editingStore,
          store_name: store_name
        }
      };
    case actions.SUBMIT_INTERESTS:
      return { 
        ...state,
        editingStore : {
          ...state.editingStore,
          interests: action.payload.interests
        }
      };
    case actions.LINK_SOCIAL:
      const social_data = action.payload.social_data
      return { 
        ...state,
        editingStore : {
          ...state.editingStore,
          social_data: social_data
        }
      };
    default:
      return state;
  }
}
