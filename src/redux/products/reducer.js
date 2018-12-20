import actions from './actions';

const initState = { products: [], loading: false, store_products: [], new_products: [], buying: []};

export default function productReducer(state = initState, action) {
  switch (action.type) {

    case actions.FETCH_PRODUCTS_SUCCESS:
      return { 
        ...state,
        products: action.payload.products
      };
    default:
      return state;
  }
}
