import {
  EDIT_CONVENIENCE_FONTSIZE,
  EDIT_CONVENIENCE_READMESSAGE,
  EDIT_CONVENIENCE_HIGHCONTRAST,
  EDIT_CONVENIENCE_CHIME,
} from "../_actions/types.js";
export function editConvenienceFontsize(dataToSubmit) {
  return {
    type: EDIT_CONVENIENCE_FONTSIZE,
    payload: dataToSubmit,
  };
}
export function editConvenienceHighcontrast(dataToSubmit) {
  return {
    type: EDIT_CONVENIENCE_HIGHCONTRAST,
    payload: dataToSubmit,
  };
}
export function editConvenienceReadmessage(dataToSubmit) {
  return {
    type: EDIT_CONVENIENCE_READMESSAGE,
    payload: dataToSubmit,
  };
}
export function editConvenienceChime(dataToSubmit) {
  return {
    type: EDIT_CONVENIENCE_CHIME,
    payload: dataToSubmit,
  };
}
