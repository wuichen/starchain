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
      const sub = ig_user.sub
      db_user = yield call(api.get, '/users/' + sub)
    } catch (err) {

      // TODO: check err is 404 not found
      if (ig_user && !db_user) {
        newUser = true
      }
    }
    const user = db_user || ig_user

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

  });
}

export function* getUserError() {
  yield takeEvery(actions.GET_USER_ERROR, function*() {});
}

export function* updateUserRequest() {
  yield takeEvery(actions.UPDATE_USER_REQUEST, function*() {
    let db_user
    try {
      db_user = yield call(api.update, '/users/12345')
      yield put({
        type: actions.UPDATE_USER_SUCCESS,
        payload: {
        }
      })
    } catch (err) {
      // TODO: check err is 404 nod found
      yield put({
        type: actions.GET_USER_ERROR
      })
    }
  });
}


export function* updateUserSuccess() {
  yield takeEvery(actions.GET_USER_SUCCESS, function*({payload, history}) {
  });
}

export function* updateUserError() {
  yield takeEvery(actions.GET_USER_ERROR, function*() {});
}


export default function* rootSaga() {
  yield all([
    fork(getUserRequest),
    fork(getUserSuccess),
    fork(getUserError),
  ]);
}
