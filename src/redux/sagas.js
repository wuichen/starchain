import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import userSagas from './user/saga';
import storesSagas from './stores/saga';
import productsSagas from './products/saga';


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    userSagas(),
    storesSagas(),
    productsSagas()
  ]);
}
