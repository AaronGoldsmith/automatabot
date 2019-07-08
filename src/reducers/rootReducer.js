import { GET_CHALLENGE, SET_PATH, SET_RESULT } from "../constants";

//  setup for generic reducer configuration
export default function(state = { challenge: {}, path: undefined, result: undefined }, action) {
  switch (action.type) {
    case GET_CHALLENGE:
      return { ...state, challenge: action.challenge };
    case SET_PATH:
      return { ...state, path: action.data };
    case SET_RESULT:
      return { ...state, result: action.data };
    default:
      return state;
  }
}
