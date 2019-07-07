const axios = require("axios");
const Board = require("./Board")

const headers = { "content-type": "application/json" }
const domain = "https://api.noopschallenge.com"
const path = "/automatabot/challenges/start" //   or new
const url = [domain, path].join("")

const getGame = async url =>
{
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.challenge

  } catch (error) {
    console.log(error);
  }
};

const sendGame = (url, data) => {
  axios.post(url, data, { headers }).then(response => console.log(response.data)).catch(err => console.log(err))
}
// initialize and run
getGame(url).then(board =>
  {
    const GOL = new Board(board)
    let age = 0;
    while (age < board.generations) {
      GOL.board = GOL.getNextBoard()
      age++;
      // console.log(GOL.toString())
    }
    sendGame(url, GOL.board)
})
