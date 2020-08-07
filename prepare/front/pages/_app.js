import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import widthReduxSaga from 'next-redux-saga';

import wrapper from '../sotre/configureStore';

const App = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>NodeBird</title>
    </Head>
    <Component />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

// 하이오더컴포넌트(HOC)로 감싸주면 된다. withRedux, withReduxSaga 모두 HOC..
export default wrapper.withRedux(widthReduxSaga(App));
