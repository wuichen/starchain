import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import { setToken, clearToken, getToken } from '../../helpers/utility';
import AuthHelper from '../../helpers/authHelper';
import notification from '../../components/notification';
import Auth0 from "../../helpers/auth0";
import api from '../../helpers/api';

export function* getUserRequest() {
  yield takeEvery(actions.GET_USER_REQUEST, function*() {
    let ig_user, db_user
    let newUser = false
    try {
      ig_user = yield call([Auth0, 'getUserInfo'])
      db_user = yield call(api.get, '/users/12345')
    } catch (err) {
      if (ig_user && !db_user) {
        newUser = true
      }
    }
    const user = Object.assign({}, ig_user, db_user)

    if (user) {
      yield put({
        type: actions.GET_USER_SUCCESS,
        payload: {
          user,
          newUser
        }
      })
    } else {
      yield put({
        type: actions.GET_USER_ERROR
      })
    }
  });
}

export function* getUserSuccess() {
  yield takeEvery(actions.GET_USER_SUCCESS, function*({payload, history}) {
    if (payload.newUser) {
      yield put(push('/setup'))
    } else {
      // TODO: add check email verification case. 
      yield put(push('/dashboard'))
    }

  });
}

export function* getUserError() {
  yield takeEvery(actions.GET_USER_ERROR, function*() {});
}

export default function* rootSaga() {
  yield all([
    fork(getUserRequest),
    fork(getUserSuccess),
    fork(getUserError),
  ]);
}
