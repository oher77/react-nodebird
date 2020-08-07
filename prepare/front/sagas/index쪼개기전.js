import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data) {
  return axios.post('/api/login', data);// 서버로 요청하는 로그인을 보낸다.
}

function* logIn(action) {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    // const result = yield call(logInAPI, action.data) // 요청한 결과값을 상수(result)로 받을 수 있다.
    // 지금은 서버가 없어서 100% 에러나므로 상단의 코드 잠시 conmment. 가짜로 delay 만듬
    yield delay(1000);
    // call은 값을 받을때 까지 기다렸다가 (함수)를 호출하고(블로킹)
    // fork는 그냥 바로 (함수)를 호출한다.(논블로킹)
    // action.data를 logInAPI함수에 매개변수로 넣는다 logInAPI(action.data)의 의미. call()의 특징이다.
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    }); // 결과를 받아서 이런 식으로 처리
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}
function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    // const result = yield call(logOutAPI) // 요청한 결과값을 상수(result)로 받을 수 있다.
    yield delay(1000);
    // call은 값을 받을때 까지 기다렸다가 (함수)를 호출하고(블로킹)
    // fork는 그냥 바로 (함수)를 호출한다.(논블로킹)
    yield put({
      type: 'LOG_IN_SUCCESS',
      // data: result.data
    }); // 결과를 받아서 이런 식으로 처리
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}
function addPostAPI(data) {
  return axios.post('/api/post', data);
}
// action에서 data꺼내서 addPostAPI(data)로 보낸다.
function* addPost(action) {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'ADD_POST_SUCCESS',
      // data: result.data
    }); // 결과를 받아서 이런 식으로 처리
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  while (true) { // 치명적인 단점이 1회성이라 while로 감싸줘서 계속적으로 실행될 수 있게한다.
    yield take('LOG_IN_REQUEST', logIn); // LOG_IN이라는 action이 실행될때 까지 기다리겠다. action이 실행되면 logIn 함수를 실행한다.
  }
}

function* watchLogOut() {
  // while문 대체 방법 : while을 쓰면 직관적이지가 않아서 takeEvery를 쓴다.
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  // takeLatest 마우스를 여러번 클릭했을때 모든 이벤트를 Request 하는 것을 방지하기 위해 제일 마지막 이젠트만 보낸다.
  yield takeLatest('ADD_POST_REQUEST', addPost, 2000);
}
// 제너레이터 * 문법
// rootSaga를 만들어 놓고
// 여기에 비동기 액션들을 하나씩 추가
export default function* rootSaga() {
  yield all([
    fork(watchLogIn), // fork 는 (함수)를 실행하는 것, call로 할 수도 있지만 차이가 있다.
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}

// 1. eventListener처럼 함수(비동기 액션)들을 막 만든다.
// 2. 그것들을 한방에 all로 등록을 해준다.
