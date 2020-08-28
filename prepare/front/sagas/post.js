import { all, put, fork, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';
// import shortId from 'shortid';
import {
  ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST,
  ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  LOAD_POST_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_REQUEST,
  LIKE_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE, UNLIKE_POST_REQUEST,
}
  from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_FROM_ME } from '../reducers/user';

function loadPostAPI(data) {
  return axios.get('/posts', data);
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`, data);
}
function* likePost(action) {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    // action에서 data꺼내서 likePostAPI(data)로 보낸다.
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: LIKE_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}
function* unlikePost(action) {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    // action에서 data꺼내서 unlikePostAPI(data)로 보낸다.
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: UNLIKE_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function addPostAPI(data) {
  return axios.post('/post', { content: data });
}
function* addPost(action) {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    // action에서 data꺼내서 addPostAPI(data)로 보낸다.
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    }); // 결과를 받아서 이런 식으로 처리
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    }); // 결과를 받아서 이런 식으로 처리
    yield put({
      type: REMOVE_POST_FROM_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);// 세번째 인자로  {withCredentials: true} 넣어준다. 그러나 매번 넣어주려면 반복되므로 index에서 aixos로 넣어준다.
}
function* addComment(action) {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
      // data: result.data
    }); // 결과를 받아서 이런 식으로 처리
  } catch (err) {
    console.log(err);
    yield put({ // put은 dispatch 개념
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLikePost() {
  // takeLatest 마우스를 여러번 클릭했을때 모든 이벤트를 Request 하는 것을 방지하기 위해 제일 마지막 이젠트만 보낸다.
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  // takeLatest 마우스를 여러번 클릭했을때 모든 이벤트를 Request 하는 것을 방지하기 위해 제일 마지막 이젠트만 보낸다.
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchLoadPost() {
  // takeLatest 마우스를 여러번 클릭했을때 모든 이벤트를 Request 하는 것을 방지하기 위해 제일 마지막 이젠트만 보낸다.
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchAddPost() {
  // takeLatest 마우스를 여러번 클릭했을때 모든 이벤트를 Request 하는 것을 방지하기 위해 제일 마지막 이젠트만 보낸다.
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  // takeLatest 마우스를 여러번 클릭했을때 모든 이벤트를 Request 하는 것을 방지하기 위해 제일 마지막 이젠트만 보낸다.
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
  // takeLatest 마우스를 여러번 클릭했을때 모든 이벤트를 Request 하는 것을 방지하기 위해 제일 마지막 이젠트만 보낸다.
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
  ]);
}
