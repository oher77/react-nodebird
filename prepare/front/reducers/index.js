import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

// initialState도 combineReducers가 알아서 합쳐주기 때문에 삭제한다.
// const initialState = {
//     user: {

//     },
//     post: {

//     }
// }

// state(이전상태, 액션) => 다음상태
// 쪼갠 reducer들(reducer는 함수)을 합쳐주기 위해 combineReducers의 도움이 필요하다.
const rootReducer = combineReducers({
  //  HYDRATE(서버사이드 렌더링을 위한)를 위해 index reducer 추가 + user reducer + post reducer
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
