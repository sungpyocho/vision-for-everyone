import { EDIT_CONVENIENCE_FONTSIZE, EDIT_CONVENIENCE_READMESSAGE, EDIT_CONVENIENCE_HIGHCONTRAST, EDIT_CONVENIENCE_CHIME } from "../_actions/types.js";
export default function (state = {fontSize: '150px', highContrast: false, readMessage: false, chime: false, }, action) {
  switch (action.type) {
    case EDIT_CONVENIENCE_FONTSIZE:
      console.log(action.payload);
      return {
        ...state, 
        fontSize: action.payload,
      };
    case EDIT_CONVENIENCE_HIGHCONTRAST:
      return {
        ...state,
        highContrast: action.payload,
      }
    case EDIT_CONVENIENCE_READMESSAGE: 
      return {
        ...state, 
        readMessage: action.payload,
      }
    case EDIT_CONVENIENCE_CHIME:
      return {
        ...state, 
        chime: action.payload,
      }
    default:
      return state;
  }
}
