import axios from "axios";
// const headers = { "content-type": "application/json" };

export const axios_get = (url, headers) => axios.get(url, headers);
export const axios_post = (url, body, headers) =>
  axios.post(url, body, headers);

export const GET_CHALLENGE = "GET_BOARD";
export const SET_PATH = "SET_PATH";
