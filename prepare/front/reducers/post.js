// import shorId from 'shortid';
import produce from 'immer';
// import faker from 'faker';

export const initialState = {
  // 속성들 서버 개발자한테 미리 물어본다. 이런식으로 달라고 요청하거나
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

// export const generateDumyPost = (number) => Array(number).fill().map(() => (
//   {
//     id: shorId.generate(),
//     User: {
//       id: shorId.generate(),
//       nickname: faker.name.findName(),
//     },
//     content: faker.lorem.paragraph(),
//     Images: [{ src: faker.image.image() }],
//     Comments: [{
//       id: shorId.generate(),
//       User: {
//         id: shorId.generate(),
//         nickname: faker.name.findName(),
//       },
//       content: faker.lorem.sentence(),
//     }],
//   }
// ));

// concat은 immutable이므로 대입해줘야함
// initialState.mainPosts = initialState.mainPosts.concat(generateDumyPost(10)); // index.js에서 LOADPOSTREUEST를 처음부터 디스패치 해주기때문에 지운다

// action이름을 상수로 빼주면 오타가 났을 때 에러에 잡혀서 편리하다.
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// data와 함께 addPostRequest를 하는 (바로 return을 해주는) action creator를 만든다.
// 그냥 액션 : export const addPostRequest = { type: ADD_POST_REQUEST }
export const addPostRequest = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
// export const addCommentRequest = (data) => ({
//   type: ADD_COMMENT_REQUEST,
//   data,
// });
// const dummyPost = (data) => ({
//   id: data.id,
//   User: {
//     id: 1,
//     nickname: '허유즈',
//   },
//   content: data.content,
//   Images: [
//     { src: 'https://m.beadsallmarket.com/web/product/big/201705/4508_shop1_566269.jpg' },
//     { src: 'https://www.docdocdoc.co.kr/news/photo/201709/1046830_1107542_5752.jpg' },
//   ],
//   Comments: [],
// });

// const dummyComment = (data) => ({
//   id: shorId.generate(),
//   User: {
//     id: 1,
//     nickname: '조더미',
//   },
//   content: data,
// });
// 이전상태를 액션을 통해 다음 상태로 만들어내는 함수 (불변성을 지키면서)
const reducer = produce((draft, action) => {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null;
      draft.hasMorePosts = true;
      break;
    case LOAD_POST_SUCCESS:
      // unshift()는 mutate, filter()는 immutable
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      draft.mainPosts = action.data.concat(draft.mainPosts);
      draft.hasMorePosts = draft.mainPosts.length < 30;
      break;
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false;
      draft.loadPostError = action.error;
      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      // unshift()는 mutate, filter()는 immutable
      draft.mainPosts.unshift(action.data);
      draft.addPostLoading = false;
      draft.addPostDone = true;
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;

    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const postIndex = draft.mainPosts.findIndex((v) => v.id === action.data.PostId); // PostId 대문자임에 유의
      draft.mainPosts[postIndex].Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;

    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      draft.removePostLoading = false;
      draft.removePostDone = true;
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;

    default:
      break;
  }
}, initialState);

export default reducer;
