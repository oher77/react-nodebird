import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  if (!me) {
    return null;
  }
  // const followerList = [{nickname: 'HerUse'}, {nickname: '제로초'},{nickname: '장하연'}];
  // const followingList = [{nickname: 'HerUse'}, {nickname: '제로초'},{nickname: '장하연'}];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={me.Followings} />
        <FollowList header="팔로워 목록" data={me.Followers} />

      </AppLayout>
    </>
  );
};

export default Profile;
