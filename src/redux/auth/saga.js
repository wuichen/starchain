import { all, takeEvery, put, call, fork, select, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import userActions from '../user/actions';
import { clearToken, getToken, getAccessToken } from '../../helpers/utility';
import AuthHelper from '../../helpers/authHelper';
import Auth0 from "../../helpers/auth0";
import notification from '../../components/notification';
import axios from 'axios';
import {setToken} from '../../helpers/api';

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
      method: 'GET',
      url: '/v1/api/users/auth0|5c0cb91439737b4049f9f276',
    })


    // axios({
    //   method: 'POST',
    //   url: '/v1/api/users',
    //   data: {
    //     email: 'ichenwdeweu07@gmail.com',
    //     ig: {
    //       id: '1234'
    //     },
    //     _id: 'auth0|5c0cb91439737b4049f9f276'
    //   }
    // })
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
      resolve(data)
    })
  })
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*() {
    try {
      setToken()
      yield put(userActions.getUser())
      yield take.maybe(userActions.GET_USER_SUCCESS)
      const user = yield select(state => state.User.user)
      if (user) {
        if (user.email_verified) {
          if (!user.stores || !user.stores[0]) {
          //   yield put(push('/dashboard'))
          // } else {
            yield put(push('/dashboard/createStore'))
          } else {
            if (window.location.pathname == '/callback') {
              yield put(push('/dashboard'))
            }
          }
        } else {
          // yield call([Auth0, 'logout'])
          yield put(push('/verifyEmail'))
        }
      } else {
        throw new Error('cant find user');
      }
    } catch (err) {
      notification('error', err || 'error');
      yield put({
        type: actions.LOGIN_ERROR,
      })
    }
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {
    yield put(actions.logout())
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield call([Auth0, 'logout'])
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const access_token = getAccessToken();
    const { token } = AuthHelper.checkExpirity(getToken());
    if (token && access_token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
      });
    }
  });
}

export function* handleAuthentication() {
  yield takeEvery(actions.LOGIN_REQUEST, function*({}) {
    try {
      const authResult = yield call([Auth0, 'handleAuthentication'])
      yield put({
        type: actions.LOGIN_SUCCESS
      })

    } catch (err) {
      console.log(err)
      yield put({ type: actions.LOGIN_ERROR });
    }
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
