import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

// Reducer: (previousState, action) => nextState
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      // action.payload는 node.js에서 반환하도록 하는 {loginSucess: boolean, userId; ~~}
      // server의 index.js의 로그인 api 마지막줄 참조.
      // 왜 action.payload가 그 값을 받아오는 것일까?
      // user_action에서 payload에 axios로 받아온 request를 넣기 때문이다.
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, registerSucess: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
}
