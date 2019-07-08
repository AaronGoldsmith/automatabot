import axios from "axios";
import { GET_CHALLENGE, SET_PATH } from "./constants";
const domain = "https://api.noopschallenge.com";
const path = "/automatabot/challenges/start"; //   or new
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
  axios
    .post(url, data, { headers })
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log(error));
}
