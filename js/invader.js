'use strict'

var gIsAlienFreeze = true
var gAlienMoveDirection = 'right'
var gAliensTopRow = 0
var gAliensBottomRow = ALIEN_ROW_COUNT - 1

function createInvaders(board) {
    gGame.alienCount = 0
    for (var i = 0; i < ALIEN_ROW_COUNT; i++) {
        for (var j = 0; j < ALIEN_ROW_LENGTH; j++) {
            updateCell(board, {i, j}, INVADER)
            gGame.alienCount++
        }
    }
    updateAliensCount(gGame.alienCount)
    console.log('Created', gGame.alienCount, 'aliens')
}

function verifyAlienCount() {
    let actualCount = 0
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (gBoard[i][j] === INVADER) {
                actualCount++
            }
        }
    }
    
    if (actualCount !== gGame.alienCount) {
        console.log('Alien count mismatch! Expected:', gGame.alienCount, 'Actual:', actualCount)
        gGame.alienCount = actualCount
        updateAliensCount(gGame.alienCount)
    }
    
    return actualCount
}

function handleAlienHit(board, pos) {
    if (!isValidPosition(pos)) {
        console.log('Invalid position:', pos)
        return
    }
    
    if (board[pos.i][pos.j] !== INVADER) {
        console.log('No alien at position:', pos, 'Content:', board[pos.i][pos.j])
        return
    }
    
    updateCell(board, pos, SKY)
    
    gGame.alienCount--
    gGame.score += ALIEN_POINTS
    
    updateAliensCount(gGame.alienCount)
    updateScore(gGame.score)
    
    console.log('Alien destroyed at', pos, 'Remaining:', gGame.alienCount)
    
    verifyAlienCount()
    
    if (gGame.alienCount <= 0) {
        console.log('All aliens destroyed! Game won!')
        gameOver(true)
        return
    }
    
    updateAlienBoundaries()
}

function updateAlienBoundaries() {
    let newTopRow = BOARD_SIZE - 1
    let newBottomRow = 0
    let alienFound = false
    
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (gBoard[i][j] === INVADER) {
                alienFound = true
                if (i < newTopRow) newTopRow = i
                if (i > newBottomRow) newBottomRow = i
            }
        }
    }
    
    if (alienFound && newTopRow <= newBottomRow) {
        gAliensTopRow = newTopRow
        gAliensBottomRow = newBottomRow
        console.log('Updated alien boundaries:', gAliensTopRow, 'to', gAliensBottomRow)
    }
}

function shiftBoardRight(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = board[i].length - 1; j > 0; j--) {
            if (board[i][j - 1] === INVADER) {
                updateCell(board, {i, j}, INVADER)
                updateCell(board, {i, j: j - 1}, SKY)
            }
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j < board[i].length - 1; j++) {
            if (board[i][j + 1] === INVADER) {
                updateCell(board, {i, j}, INVADER)
                updateCell(board, {i, j: j + 1}, SKY)
            }
        }
    }
}

function shiftBoardDown(board) {
    if (gAliensBottomRow >= board.length - 2) {
        gameOver(false)
        return
    }
    
    for (let i = gAliensBottomRow; i >= gAliensTopRow; i--) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === INVADER) {
                updateCell(board, {i: i+1, j}, INVADER)
                updateCell(board, {i, j}, SKY)
            }
        }
    }

    gAliensTopRow++
    gAliensBottomRow++
}

function moveInvaders() {
    if (gIsAlienFreeze || !gGame || !gGame.isOn) return

    let isEdgeReached = false

    if (gAlienMoveDirection === 'right') {
        for (let i = gAliensTopRow; i <= gAliensBottomRow; i++) {
            if (gBoard[i][BOARD_SIZE - 1] === INVADER) {
                isEdgeReached = true
                break
            }
        }
    } else {
        for (let i = gAliensTopRow; i <= gAliensBottomRow; i++) {
            if (gBoard[i][0] === INVADER) {
                isEdgeReached = true
                break
            }
        }
    }

    if (isEdgeReached) {
        shiftBoardDown(gBoard)
        gAlienMoveDirection = gAlienMoveDirection === 'right' ? 'left' : 'right'
    } else {
        if (gAlienMoveDirection === 'right') {
            shiftBoardRight(gBoard, gAliensTopRow, gAliensBottomRow)
        } else {
            shiftBoardLeft(gBoard, gAliensTopRow, gAliensBottomRow)
        }
    }
    
    checkGameOver()
}