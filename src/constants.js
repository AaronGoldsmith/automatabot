import axios from "axios";
export const axios_get = (url, headers) => axios.get(url, headers);
export const axios_post = (url, body, headers) =>
  axios.post(url, body, headers);

export const base_api = "https://api.noopschallenge.com";

export const GET_ANY = "GET_RAND";
export const GET_RULES = "GET_RULES";
export const GET_NEW_BOARD = "GET_NEW_BOARD";
export const SET_PATH = "SET_PATH";
export const SET_RESULT = "SET_RESULT";
