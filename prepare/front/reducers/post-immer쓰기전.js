import shorId from 'shortid';

export const initialState = {
  // 속성들 서버 개발자한테 미리 물어본다. 이런식으로 달라고 요청하거나
  mainPosts: [{
    // User, Image, Commnets는 대문자로 시작하는 이유: 시퀄라이져에서 다른 것과 합쳐서 나오는 정보는 대문자로 출력해서 보내준다.
    // 어떻게 데이터 보내줄건지 서버개발자한테 요청한다.
    id: 'firstPost',
    User: {
      id: 'firstUser',
      nickname: '허유즈',
    },
    content: '첫번째 게시글 #해시택 #익스프렛',
    Images: [
      { src: 'https://m.beadsallmarket.com/web/product/big/201705/4508_shop1_566269.jpg' },
      { src: 'https://www.docdocdoc.co.kr/news/photo/201709/1046830_1107542_5752.jpg' },
      { src: 'https://m.nemone.co.kr/web/product/big/201805/3973_shop1_468769.jpg' },
    ],
    Comments: [
      {
        User: {
          nickname: '조유즈',
        },
        content: '이거시 오늘 점식 메뉴ㅋㅋ',
      },
      {
        User: {
          nickname: '장유즈',
        },
        content: '이거시 오늘의 간식!!~',
      },
    ],
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};
// action이름을 상수로 빼주면 오타가 났을 때 에러에 잡혀서 편리하다.
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
const dummyPost = (data) => ({
  id: data.id,
  User: {
    id: 1,
    nickname: '허유즈',
  },
  content: data.content,
  Images: [
    { src: 'https://m.beadsallmarket.com/web/product/big/201705/4508_shop1_566269.jpg' },
    { src: 'https://www.docdocdoc.co.kr/news/photo/201709/1046830_1107542_5752.jpg' },
  ],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shorId.generate(),
  User: {
    id: 1,
    nickname: '조더미',
  },
  content: data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = state.mainPosts[postIndex]; // 해당포스트
      const Comments = [dummyComment(action.data.content), ...post.Comments]; // 해당인덱스포스트 복사, dummyComment로 추가된 코멘트
      const mainPosts = [...state.mainPosts]; // mainPosts 복사
      mainPosts[postIndex] = { ...post, Comments }; // 복사한 mainPosts의 해당인덱스 포스트를 변경
      // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      // const post = { ...state.mainPosts[postIndex] };
      // post.Comments = [dummyComment(action.data.content), ...post.Comments];
      // const mainPosts = [...state.mainPosts];
      // mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        addCommentLoading: false,
        addCommentError: action.error,
      };

    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        addPostLoading: false,
        addPostError: action.error,
      };

    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        removePostLoading: false,
        removePostError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
