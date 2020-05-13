//check if any of the patterns below are matched with X or O. If so, the player has won.
export function checkForWin(board: string[], player: string): boolean {
  const isWinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ].some((indices) => indices.every((index) => board[index] === player))

  if (isWinner) {
    return true
  }

  return false
}

//check if nobody wins. If the array does not contain * and non of the rules above apply, nobody wins.
export function isBoardFull(board: string[]): boolean {
  if (!board.includes('*')) {
    if (!checkForWin(board, 'X')) {
      if (!checkForWin(board, 'O')) {
        return true
      }
    }
  }

  return false
}

//showing the board in 3 rows and 3 columns
export function showBoard(board: string[]): void {
  console.log('---------')
  console.log(board.slice(0, 3).join('   '))
  console.log('')
  console.log(board.slice(3, 6).join('   '))
  console.log('')
  console.log(board.slice(6, 9).join('   '))
  console.log('---------')
}
