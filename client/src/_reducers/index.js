import { combineReducers } from "redux";
import message from "./message_reducer";
import user from "./user_reducer";
import accessibility from "./accessibility_reducer";

const rootReducer = combineReducers({
  message,
  user,
  accessibility,
});

export default rootReducer;
