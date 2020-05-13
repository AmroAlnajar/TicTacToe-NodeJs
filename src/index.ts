import { showBoard, checkForWin, isBoardFull } from './gameLogic'

//user input and format
const input = process.stdin
input.setEncoding('utf-8')

console.log('You will start with X.')
console.log('Please choose a box number from 1 to 9 to fill the desired box.')

//initializing an array of 9 fields where each one contains * as a start
const gameBoard: string[] = [] // = ["*", "*", "*", "*", "*", "*", "*", "*", "*"];
const symbol = '*'

for (let i = 0; i < 9; i++) {
  gameBoard[i] = symbol
}

showBoard(gameBoard)

//determining who's turn it is and the players' symbols
let player1IsPlaying: boolean = true
const player1: string = 'X'
const player2: string = 'O'

//Game loop
input.on('data', function (data: Buffer) {
  const userInput: number = Number(data[0])
  console.clear()

  //bad input
  if (userInput > 9 || userInput < 1 || isNaN(userInput)) {
    console.log(
      'Please enter a number between 1 and 9 to fill the required field'
    )
  } else if (gameBoard[userInput - 1] != symbol) {
    console.log("The spot you're trying to fill is already taken.")
  }
  //which player's turn
  else if (player1IsPlaying) {
    gameBoard[userInput - 1] = player1
    player1IsPlaying = false
  } else if (!player1IsPlaying) {
    gameBoard[userInput - 1] = player2
    player1IsPlaying = true
  }

  showBoard(gameBoard)
  checkForWin(gameBoard, player1)
  checkForWin(gameBoard, player2)

  if (isBoardFull(gameBoard)) {
    console.log('nobody wins')
    process.exit()
  }

  if (checkForWin(gameBoard, player1)) {
    console.log(player1 + ' wins')
    process.exit()
  } else if (checkForWin(gameBoard, player2)) {
    console.log(player2 + ' wins')
    process.exit()
  }

  if (player1IsPlaying) {
    console.log(player1 + "'s turn")
  } else {
    console.log(player2 + "'s turn")
  }
})
