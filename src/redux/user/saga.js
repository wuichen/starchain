import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import {END} from 'redux-saga'
import { push } from 'react-router-redux';
import actions from './actions';
import { setToken, clearToken, getToken } from '../../helpers/utility';
import AuthHelper from '../../helpers/authHelper';
import notification from '../../components/notification';
import Auth0 from "../../helpers/auth0";
import {api} from '../../helpers/api';
import authActions from '../auth/actions';

export function* getUserRequest() {
  yield takeEvery(actions.GET_USER_REQUEST, function*() {
    try {
      const auth0_user = yield call([Auth0, 'getUserInfo'])
      const sub = auth0_user.sub
      const response = yield call(api.get, '/users/' + sub)
      yield put({
        type: actions.GET_USER_SUCCESS,
        payload: {
          user: response.data
        }
      })
    } catch (err) {
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
  yield takeEvery(actions.GET_USER_ERROR, function*() {
    // yield put(END)
    yield put(authActions.logout())
  });
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
