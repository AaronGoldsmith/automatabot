import React from "react";
import axios from "axios";
// const axios = require("axios");
const headers = { "content-type": "application/json" };
const domain = "https://api.noopschallenge.com";
const path = "/automatabot/challenges/start"; //   or new
const url = [domain, path].join("");
export const getGame = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.challenge;
  } catch (error) {
    console.log(error);
  }
};

export const sendGame = (url, data) => {
  axios
    .post(url, data, { headers })
    .then(response => console.log(response.data))
    .catch(err => console.log(err));
};
