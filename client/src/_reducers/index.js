import { combineReducers } from "redux";
import message from "./message_reducer";
import user from "./user_reducer";

const rootReducer = combineReducers({
  message,
  user,
});

export default rootReducer;
