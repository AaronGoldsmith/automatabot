import {
  GET_ANY,
  GET_NEW_BOARD,
  SET_PATH,
  SET_RESULT,
  GET_RULES
} from "../constants";

//  setup for generic reducer configuration
export default function(
  state = {
    challenge: undefined,
    path: undefined,
    result: undefined,
    ruleList: undefined
  },
  action
) {
  switch (action.type) {
    case GET_ANY:
      return { ...state, challenge: action.challenge };
    case GET_NEW_BOARD:
      return { ...state, spawnedBoard: action.challenge };
    case GET_RULES:
      return { ...state, ruleList: action.rules };
    case SET_PATH:
      return { ...state, path: action.data };
    case SET_RESULT:
      return { ...state, result: action.data };
    default:
      return state;
  }
}
