import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

// 3단 고차함수로 인자들을 매개변수들로 제공해주기 때문에 그걸로 필요한 middleware를 만들어서 쓸 수 있다.
const loggerMiddleware = ({ dispatch, gesState }) => (next) => (action) => {
  // if (typeof action === 'function') {
  //     return action(dispatch, getStore);
  // }
  console.log(action);// 액션이 있을 때마다 redux dev tool 처럼 액션명을 콘솔에 찍어준다.

  return next(action);
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

// 두번째 인자는 옵션 객체
// debug가 true면 redux에 대해 좀 더 자세한 설명이 나오기 때문에 개발(deveolopment)할때는 debug를 true로 두는 게 코딩할 때 편하다.
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
