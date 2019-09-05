//user input and format
const input = process.stdin;
input.setEncoding("utf-8");

console.log("You will start with X.");
console.log("Please choose a box number from 1 to 9 to fill the desired box.");

//initializing an array of 9 fields where each one contains * as a start
let gameBoard = []; // = ["*", "*", "*", "*", "*", "*", "*", "*", "*"];
const symbol = "*";

for (let i = 0; i < 9; i++) {
  gameBoard[i] = symbol;
}

//determining who's turn it is and the players' symbols
let player1IsPlaying = true;
const player1 = "X";
const player2 = "O";

//Game loop
input.on("data", function(data) {
  console.clear();

  //bad input
  if (parseInt(data) > 9 || parseInt(data) < 1 || isNaN(data)) {
    console.log(
      "Please enter a number between 1 and 9 to fill the required field"
    );
  } else if (gameBoard[parseInt(data) - 1] != symbol) {
    console.log("The spot you're trying to fill is already taken.");
  }
  //which player's turn
  else if (player1IsPlaying) {
    gameBoard[parseInt(data) - 1] = player1;
    player1IsPlaying = false;
  } else if (!player1IsPlaying) {
    gameBoard[parseInt(data) - 1] = player2;
    player1IsPlaying = true;
  }

  showBoard(gameBoard);
  checkForWin(gameBoard, player1);
  checkForWin(gameBoard, player2);

  if (checkForFullBoard(gameBoard)) {
    console.log("nobody wins");
    process.exit();
  }

  if (checkForWin(gameBoard, player1)) {
    console.log(player1 + " wins");
    process.exit();
  } else if (checkForWin(gameBoard, player2)) {
    console.log(player2 + " wins");
    process.exit();
  }

  if (player1IsPlaying) {
    console.log(player1 + "'s turn");
  } else {
    console.log(player2 + "'s turn");
  }
});

//check if any of the patterns below are matched with X or O. If so, the player has won.
function checkForWin(board, player) {
  const isWinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ].some(indices => indices.every(index => board[index] === player));

  if (isWinner) {
    return true;
  }
}

//check if nobody wins. If the array does not contain * and non of the rules above apply, nobody wins.
function checkForFullBoard(board) {
  if (!board.includes("*")) {
    return true;
  }
}

//showing the board in 3 rows and 3 columns
function showBoard(board) {
  console.log("---------");
  console.log(board.slice(0, 3).join("   "));
  console.log("");
  console.log(board.slice(3, 6).join("   "));
  console.log("");
  console.log(board.slice(6, 9).join("   "));
  console.log("---------");
}
