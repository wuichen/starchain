import { push } from 'react-router-redux';
import actions from './actions';
import { all, takeEvery, put, call, fork, select, take } from 'redux-saga/effects';
import {api} from '../../helpers/api';


export function* submitStoreRequest() {
  yield takeEvery(actions.SUBMIT_STORE_REQUEST, function*() {
    try {
      const editing_store = yield select(state => state.Store.editing_store)

      const store = yield call(api.post, '/stores', editing_store)

      yield put({
        type: actions.SUBMIT_STORE_SUCCESS
      })
    } catch (err) {
      // TODO: check err is 404 nod found
      yield put({
        type: actions.SUBMIT_STORE_ERROR
      })
    }
  });
}


export function* submitStoreSuccess() {
  yield takeEvery(actions.SUBMIT_STORE_SUCCESS, function*({payload, history}) {
  });
}

export function* submitStoreError() {
  yield takeEvery(actions.SUBMIT_STORE_ERROR, function*() {});
}




export default function* rootSaga() {
  yield all([
  	fork(submitStoreRequest)
  ]);
}
