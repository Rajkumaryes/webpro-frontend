import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../helpers/Firebase';
import { createNotification } from '../../toast';
import {apiUrl,Master_gateway,LiveBuild} from '../../constants/defaultValues'
import {logout} from '../../helpers/authheader';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

import { adminRoot, currentUser } from "../../constants/defaultValues"
import { setCurrentUser } from '../../helpers/Utils';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      const item = { uid: loginUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      createNotification('Login Success','success','filled') 
      history.push(adminRoot);
    } else {
      yield put(loginUserError());
      createNotification(loginUser.message,'error','filled') 
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

// function* logout({ payload }) {
//   const { history } = payload;
//   setCurrentUser();
//   yield call(logoutAsync, history);
// }

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

// function* forgotPassword({ payload }) {
//   const { email } = payload.forgotUserMail;
//   try {
//     const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
//     if (!forgotPasswordStatus) {
//       yield put(forgotPasswordSuccess('success'));
//     } else {
//       yield put(forgotPasswordError(forgotPasswordStatus.message));
//     }
//   } catch (error) {
//     yield put(forgotPasswordError(error));
//   }
// }
function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
};
     
return fetch( `${apiUrl}${Master_gateway}users/forgotpassword`, requestOptions)
.then(response => response.json())

  .then(user => {
      if(user.status){
        createNotification('The reset password link has been sent to your registered mail ID','success','filled')
        setTimeout(
          function() {
            var url = LiveBuild === true ? '/webpro/#' : '/'
            window.location.replace(url)
          }
            .bind(this),
            1000
        );
      }
      else {
        createNotification('Incorrect Credentials','error','filled')
          }
    }) 
    .catch((error) => {

      forgotPasswordError(error)
  });
}
export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  // const { newPassword, resetPasswordCode } = payload;
  const { password, resetPasswordCode } = payload;
  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password})
    };
    console.log('hhhhh',password)     
    return fetch( `${apiUrl}${Master_gateway}users/resetpassword/${resetPasswordCode}`, requestOptions)
    .then(response => response.json())
    
      .then(user => {
          if(user.status){
            createNotification('Your password has been reset','success','filled')  
            setTimeout(
              function() {
                var url = LiveBuild === true ? '/webpro/#' : '/'
                window.location.replace(url)
              }
                .bind(this),
                1000
            );
            
          }
          else{
            createNotification(user.message,'error','filled') 
          }
        }) 
        .catch((error) => {
    
          forgotPasswordError(error)
      });
  // try {
  //   const resetPasswordStatus = yield call(
  //     resetPasswordAsync,
  //     resetPasswordCode,
  //     newPassword
  //   );
  //   if (!resetPasswordStatus) {
  //     yield put(resetPasswordSuccess('success'));
  //   } else {
  //     yield put(resetPasswordError(resetPasswordStatus.message));
  //   }
  // } catch (error) {
  //   yield put(resetPasswordError(error));
  // }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
