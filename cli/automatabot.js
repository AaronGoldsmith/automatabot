const axios = require("axios");
const Board = require("./Board")
const ui = require("cliui")();

const headers = { "content-type": "application/json" }
const domain = "https://api.noopschallenge.com"
const path = "/automatabot/challenges/start"


const url = [domain, path].join("")
const args = process.argv.slice(2);

const getGame = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.challenge
  } catch (error) {
    console.log(error);
  }
};

const sendGame = (url, data) => {
  axios.post(url, data, { headers })
       .then(response => {
         console.log(response.data);
         return response.data 
         })
       .catch(err => console.log(err))
}
// initialize and run

getGame(url).then(board => {
  const GOL = new Board(board)
  let age = 0;
  while (age < board.generations) {
    GOL.board = GOL.getNextBoard()
    age++;
    if (args[0] !== "--silent") {
      const str = GOL.toString()

      ui.div({ text: `generation ${age}` })
      // console.log(`generation ${age}`)
      str.map(row => {
        ui.div({ text: row, align: "center", padding: [0, 20, 0, 0] })
      })
      ui.div("\n")
    }
    console.log(ui.toString())
  }
  return sendGame(url, GOL.board)
})

