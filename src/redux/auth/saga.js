import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import userActions from '../user/actions';
import { setToken, clearToken, getToken } from '../../helpers/utility';
import AuthHelper from '../../helpers/authHelper';
import Auth0 from "../../helpers/auth0";
import notification from '../../components/notification';
import axios from 'axios';

// export function* loginRequest() {
//   yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
//     const { history, userInfo } = payload;
//     const result = yield call(AuthHelper.login, userInfo);
//     if (result.token) {
//       yield put({
//         type: actions.LOGIN_SUCCESS,
//         payload: result,
//         token: result.token,
//         history
//       });
//     } else {
//       notification('error', result.error || result);
//       yield put({ type: actions.LOGIN_ERROR });
//     }
//   });
// }

export function promiseTest() {
  // return new Promise((resolve, reject) => {
  //   fetch('/v1/idp')
  //   .then((resp) => resp.json()) // Transform the data into json
  //   .then(function(data) {
  //     console.log(data)
  //     resolve(data)
  //   })
  // })
  // 
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/v1/users',
      data: {
        email: 'ichenwerddu07@gmail.com',
        ig: {
          id: '1234'
        },
        id: '1234'
      }
    })
    // fetch('/v1/users', {
    //   method: 'POST',
    //   headers: {
    //     "Content-type": "application/x-www-form-urlencoded"
    //   },
    //   body: JSON.stringify({
    //     email: 'ichenwu02@gmail.com'
    //   })
    // })
    .then(function(data) {
      console.log(data)
      resolve(data)
    })
  })
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*({ payload, history }) {
    yield setToken(payload.token);

    // yield put(userActions.getUser())

    // if (payload.newUser) {
    //   yield put(push('/register'))
    // } else {
    //   // TODO: add check email verification case. 
    //   yield put(push('/dashboard'))
    // }
    // yield call(promiseTest)
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {
    clearToken();
    Auth0.signout()
    yield put(push('/'));
    yield call([Auth0, 'signout'])
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const { token } = AuthHelper.checkExpirity(getToken());
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: { token },
        // token,
        // profile: 'Profile'
      });
    }
  });
}

export function* handleAuthentication() {
  yield takeEvery(actions.LOGIN_REQUEST, function*({}) {
    try {
      const authResult = yield call([Auth0, 'handleAuthentication'])
      console.log(authResult)
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: {
          token: authResult.idToken
        }
      })

    } catch (err) {
      console.log(err)
      yield put({ type: actions.LOGIN_ERROR });
    }




    // const authResult = yield call([Auth0, 'checkSession'])
    // // console.log(authResult)
    // const { token } = AuthHelper.checkExpirity(getToken());
    // if (token) {
    //   yield put({
    //     type: actions.LOGIN_SUCCESS,
    //     payload: { token },
    //     // token,
    //     // profile: 'Profile'
    //   });
    // }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(handleAuthentication),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
