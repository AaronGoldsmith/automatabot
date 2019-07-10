// TODO: determine why longer boards (vs taller) break prog
//
import axios from "axios";
import { GET_CHALLENGE, SET_PATH, SET_RESULT } from "./constants";
const domain = "https://api.noopschallenge.com";
const path = "/automatabot/challenges/new"; //   or new
const headers = { "content-type": "application/json" };

export function getGame() {
  const PATH = `${domain}${path}`;
  return dispatch => {
    axios
      .get(PATH, { headers })
      .then(response => {
        // console.log(response.data);
        dispatch({
          type: GET_CHALLENGE,
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
