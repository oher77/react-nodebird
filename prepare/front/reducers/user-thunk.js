export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

// Thunk에서는 비동기 action creator 추가가 가능하다.
// 성공하면 '성공했습니다' 메세지 출력 액션.
// 실패하면 '로그인에 실패했습니다' 에러 메세지 출력
// Thunk를 쓰지 않고 Saga를 쓴 이유:
// 원하는 기능을 일일히 javascript로 구현해줘야한다.
// 예: delay 가 필요할 경우 Thunk는 setTimeout함수로 일일히 구현해줘야 하는데
// Saga에서는 미리 만들어진 것을 제공한다.
// 예2: 로그인 클릭을 두번한 경우 Thunk는 두 번 다 요청이 가는데
// Saga에서는 Take Latest 라는 것이 있어 가장 마지막 것만 요청을 보내고 나머지는 무시한다.
// 예3: 프론트를 잘 못 만들면 도스 공격을 때릴 수가 있다.
// 스크롤이벤트마다 액션을 넣으면 초에 수백개의 리퀘스트가 가서 도스공격이 된다.
// 자기서버에 셀프 디도스 공겨하는 사람이 되지 말자.
// throatle(쓰로틀?), debounce 같은 거 적용해주면 1초에 몇번 이하로만 리퀘스트가 가도록 막을 수있다.
export const loginAction = (data) => (dispatch, getState) => {
  const state = getState();
  dispatch(loginRequestAction());
  axios.post('/api/login')
    .then((res) => {
      dispatch(loginSuccessAction(res.data));
    })
    .catch((err) => {
      dispatch(loginFailureAction(err));
    });
};

// action creator
export const loginRequestAction = (data) => ({
  type: 'LOG_IN_REQUEST',
  data,
});
export const loginSuccessAction = (data) => ({
  type: 'LOG_IN_SUCCESS',
  data,
});
export const loginFailureAction = (data) => ({
  type: 'LOG_IN_FAILURE',
  data,
});
export const logoutRequestAction = (data) => ({
  type: 'LOG_OUT_REQUEST',
  data,
});
export const logoutSuccessAction = (data) => ({
  type: 'LOG_OUT_SUCCESS',
  data,
});
export const logoutFailureAction = (data) => ({
  type: 'LOG_OUT_FAILURE',
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case 'LOGOUT_ACTION':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };

    default:
      return state;
  }
};

export default reducer;
