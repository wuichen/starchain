import actions from './actions';

const initState = { stores: [], editingStore: {}, loading: false};

export default function storeReducer(state = initState, action) {
  switch (action.type) {
    case actions.SUBMIT_STORE_NAME:
      const storeName = action.payload.storeName
      return { 
        ...state,
        editingStore : {
          ...state.editingStore,
          store_name: storeName
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
      const socialData = action.payload.socialData
      return { 
        ...state,
        editingStore : {
          ...state.editingStore,
          social_data: socialData
        }
      };
    default:
      return state;
  }
}
