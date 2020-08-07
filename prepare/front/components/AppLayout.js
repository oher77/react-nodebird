import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const InputSearch = styled(Input.Search)`
    vertical-align: middle;
    .anticon {
        margin-right: 0;
    }
`;

const AppLayout = ({ children }) => {
  // state.user.logInDone : reducer의 initialState에서 받아올 수있다
  const { me } = useSelector((state) => state.user);
  // 구조분해 할당으로 써도 된다
  // const {isLoggedIn} = useSelector((state) => state.user)

  return (
    <div>
      <div>

        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/"><a>노드버드</a></Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/profile"><a>프로필</a></Link>
          </Menu.Item>
          <Menu.Item>
            <InputSearch enterButton />
          </Menu.Item>
          <Menu.Item>
            <Link href="/signup"><a>회원가입</a></Link>
          </Menu.Item>
        </Menu>
      </div>
      <Row gutter="10">
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}> {children}</Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/oher77" target="_blank" rel="noreferrer noopener">Made by HerUse</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
