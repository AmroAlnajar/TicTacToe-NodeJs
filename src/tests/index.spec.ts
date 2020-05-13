import { checkForWin, isBoardFull } from '../gameLogic'

const x = 'X'
const o = 'O'

describe('Test suit for game logic', () => {
  it('Returns false when game board is empty', () => {
    const mockGameBoard = ['*', '*', '*', '*', '*', '*', '*', '*', '*']

    expect(isBoardFull(mockGameBoard)).toBe(false)
  })

  it('Returns true when game board is full and there is no winner', () => {
    const mockGameBoard = [o, o, x, x, o, o, o, x, x]

    expect(isBoardFull(mockGameBoard)).toBe(true)
  })

  it('Returns true when player1 wins', () => {
    const mockGameBoard = [x, x, o, o, x, o, x, o, x]

    expect(checkForWin(mockGameBoard, 'X')).toBe(true)
  })

  it('Returns true when player2 wins', () => {
    const mockGameBoard = [x, o, x, x, o, o, o, o, x]

    expect(checkForWin(mockGameBoard, 'O')).toBe(true)
  })
})
