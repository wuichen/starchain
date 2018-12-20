import { all, takeEvery, put, call, fork, select, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import {api} from '../../helpers/api';
import userActions from '../user/actions';

export function* fetchProductsRequest() {
  yield takeEvery(actions.FETCH_PRODUCTS_REQUEST, function*() {
    try {
      const user = yield select(state => state.User.user)
      if (!user) {
       yield take(userActions.GET_USER_SUCCESS)
      } 
      const products = yield call(api.get, '/products?store_name=all')
      yield put({
        type: actions.FETCH_PRODUCTS_SUCCESS,
        payload: {
        	products: products.data
        }
      })
    } catch (err) {
      // TODO: check err is 404 nod found
      yield put({
        type: actions.FETCH_PRODUCTS_ERROR
      })
    }
  });
}


export function* fetchProductsSuccess() {
  yield takeEvery(actions.FETCH_PRODUCTS_SUCCESS, function*({payload, history}) {
    // const products = payload.products
    // const Stores = yield select(state => state.Stores)
    // const current_store = Stores.current_store
    // const store_product_ids = []
    // if (current_store === 'all') {
    //   for (var i = 0; i < Stores.stores.length; i++) {
    //     const store = Stores.stores[i]
    //     for (var j = 0; j < store.products.length; j++) {
    //       store_product_ids.push(store.products[j])
    //     }
    //   }

    // }

  });
}

export function* fetchProductsError() {
  yield takeEvery(actions.FETCH_PRODUCTS_ERROR, function*() {});
}



export default function* rootSaga() {
  yield all([
  	fork(fetchProductsRequest),
  ]);
}
