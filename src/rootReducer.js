import { GET_CHALLENGE, SET_PATH } from "./constants";

//  setup for generic reducer configuration
export default function(state = { challenge: {}, path: undefined }, action) {
  switch (action.type) {
    case GET_CHALLENGE:
      return { ...state, challenge: action.challenge };
    case SET_PATH:
      return { ...state, path: action.data };
    default:
      return state;
  }
}
