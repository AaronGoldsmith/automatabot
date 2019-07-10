import axios from "axios";
import {
  GET_ANY,
  GET_RULES,
  SET_PATH,
  SET_RESULT,
  base_api,
  axios_post,
  axios_get
} from "./constants";
const bot = "automatabot";
const path = "/challenges/new"; //   or new
const rules = "/automatabot/rules";
const headers = { "content-type": "application/json" };

export function getAnyGame() {
  const PATH = `${base_api}/${bot}/${path}`;
  return dispatch => {
    axios_get(PATH, { headers })
      .then(response => {
        dispatch({
          type: GET_ANY,
          challenge: response.data.challenge
        });
        dispatch({
          type: SET_PATH,
          data: response.data.challengePath
        });
      })
      .catch(error => console.log(error));
  };
}

export function getRules() {
  const PATH = `${base_api}${rules}`;
  return dispatch => {
    axios
      .get(PATH, { headers })
      .then(response => {
        dispatch({
          type: GET_RULES,
          rules: response.data
        });
      })
      .catch(error => console.log(error));
  };
}

export function sendGame(url, body) {
  const URL = `${base_api}${url}`;
  console.log(body);
  return dispatch =>
    axios_post(URL, body, { headers })
      .then(response => {
        dispatch({
          type: SET_RESULT,
          action: response.data
        });
      })
      .catch(error => console.log(error));
}
