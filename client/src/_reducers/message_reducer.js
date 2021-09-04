import { SAVE_MESSAGE, CLEAR_MESSAGE } from '../_actions/types';

export default function (state = { messages: [] }, action) {
  switch (action.type) {
    case SAVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
}
