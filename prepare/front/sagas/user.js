import { all, put, fork, delay, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
} from '../reducers/user';

function logInAPI(data) {
  return axios.post('/user/login', data);// 서버로 요청하는 로그인을 보낸다.
}

function* logIn(action) {
  // 실패할 경우를 대비해 try catch로 감싼다.
  try {
    // action.data를 logInAPI함수에 매개변수로 넣는다 logInAPI(action.data)의 의미. call()의 특징이다.
    // 여기서 잠깐! call과 fork의 차이
    // call은 값을 받을때 까지 기다렸다가 (함수)를 호출하고(블로킹)
    // fork는 그냥 바로 (함수)를 호출한다.(논블로킹)
    const result = yield call(logInAPI, action.data);
    // yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      // data: action.data,
      data: result.data,
      // 서버로 부터 결과를 받는다.
    });
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}
function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      // data: result.data
      // 결과를 받아서 이런 식으로 처리
    });
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) { // data는 action.data {email:, password: nickname: }객체
  // post, put, patch만  백엔드로 data 보내기 가능.
  return axios.post('/user', data);
}

function* signUp(action) {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    // yield delay(1000);
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
