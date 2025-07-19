'use strict'

const SKY = ' '
const BOARD_SIZE = 14
const INVADER = '👽'
const PLAYER = '♆'
const LASER = '⤊'
const SUPER_LASER = '^'
const CANDY = '🍬'
const ALIEN_POINTS = 10
const CANDY_POINTS = 50
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const ALIEN_SPEED = 500
const REGULAR_LASER_SPEED = 100
const SUPER_LASER_SPEED = 50
const CANDY_DURATION = 5000 
const CANDY_INTERVAL = 10000 
const FREEZE_DURATION = 5000

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function getElCell(pos, value) {
    const elCell = document.querySelector(`.cell-${pos.i}-${pos.j}`)
    if (elCell) {
        elCell.innerHTML = value
    }
}

function updateCell(board, pos, value) {
    if (pos.i >= 0 && pos.i < board.length && pos.j >= 0 && pos.j < board[0].length) {
        board[pos.i][pos.j] = value
        renderBoard(board)
    }
}

function updateScore(score) {
    const scoreElement = document.querySelector('.count-score')
    if (scoreElement) {
        scoreElement.innerText = score
    }
}

function updateAliensCount(count) {
    const aliensElement = document.querySelector('.aliens-count')
    if (aliensElement) {
        aliensElement.innerText = count
    }
}

function isValidPosition(pos) {
    return pos.i >= 0 && pos.i < BOARD_SIZE && pos.j >= 0 && pos.j < BOARD_SIZE
}

function getEmptyPositionsInFirstRow(board) {
    const emptyPositions = []
    for (let j = 0; j < board[0].length; j++) {
        if (board[0][j] === SKY) {
            emptyPositions.push({ i: 0, j })
        }
    }
    return emptyPositions
}