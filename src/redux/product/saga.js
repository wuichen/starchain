import { all, takeEvery, put, call, fork, select, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import api from '../../helpers/api';

export function* fetchProductsRequest() {
  yield takeEvery(actions.FETCH_PRODUCTS_REQUEST, function*() {
    try {
      const products = yield call(api.get, '/products')
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
