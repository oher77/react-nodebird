import React, { useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Form, Button } from 'antd';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { changeNicknameLoading, changeNicknameDone } = useSelector((state) => state.user)
  const [nickname, onChangeText, setText] = useInput('');
  const style = useMemo(() => ({ marginBottom: '20px', marginTop: '10px', border: '1px solid #d9d9d9', padding: '20px' }),
    []);
  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);
  useEffect(() => {
    if (changeNicknameDone) {
      setText('');
    }
  }, [changeNicknameDone]);
  return (
    <Form style={style}>
      <Input.Search
        addonBefore="닉네임"
        value={nickname}
        onChange={onChangeText}
        enterButton="수정"
        loading={changeNicknameLoading}
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
