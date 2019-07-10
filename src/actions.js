// TODO: determine why longer boards (vs taller) break prog
//
import axios from "axios";
import {
  GET_ANY,
  GET_RULES,
  SET_PATH,
  SET_RESULT,
  base_api
} from "./constants";
const path = "/automatabot/challenges/new"; //   or new
const rules = "/automatabot/rules";
const headers = { "content-type": "application/json" };

export function getGame() {
  const PATH = `${base_api}${path}`;
  return dispatch => {
    axios
      .get(PATH, { headers })
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
        console.log(response.data);
        dispatch({
          type: GET_RULES,
          challenge: response.data
        });
      })
      .catch(error => console.log(error));
  };
}

export function sendGame(url, data) {
  return dispatch => {
    axios
      .post(url, data, { headers })
      .then(response => {
        console.log(response);
        dispatch({ type: SET_RESULT, data: response.result });
      })
      .catch(error => console.log(error));
  };
}
