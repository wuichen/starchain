import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import userSagas from './user/saga';
import storeSagas from './store/saga';
import productSagas from './product/saga';


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    userSagas(),
    storeSagas(),
    productSagas()
  ]);
}
