import { SAVE_MESSAGE, CLEAR_MESSAGE } from "./types";

export function saveMessage(dataToSubmit) {
  return {
    type: SAVE_MESSAGE,
    payload: dataToSubmit,
  };
}

export function clearMessage() {
  return {
    type: CLEAR_MESSAGE,
  };
}
