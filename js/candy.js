'use strict'

var gCandyInterval
var gCandyTimeoutId

function startCandySpawn() {
    gCandyInterval = setInterval(spawnCandy, CANDY_INTERVAL)
}

function stopCandySpawn() {
    if (gCandyInterval) {
        clearInterval(gCandyInterval)
        gCandyInterval = null
    }
    if (gCandyTimeoutId) {
        clearTimeout(gCandyTimeoutId)
        gCandyTimeoutId = null
    }
}

function spawnCandy() {
    if (!gGame || !gGame.isOn) return
    
    const emptyPositions = getEmptyPositionsInFirstRow(gBoard)
    if (emptyPositions.length === 0) return

    const randomPos = emptyPositions[Math.floor(Math.random() * emptyPositions.length)]
    updateCell(gBoard, randomPos, CANDY)

    gCandyTimeoutId = setTimeout(() => {
        if (gBoard[randomPos.i][randomPos.j] === CANDY) {
            updateCell(gBoard, randomPos, SKY)
        }
    }, CANDY_DURATION)
}

function handleCandyHit(pos) {
    if (!isValidPosition(pos) || gBoard[pos.i][pos.j] !== CANDY) {
        return
    }
    
    updateCell(gBoard, pos, SKY)
    gGame.score += CANDY_POINTS
    updateScore(gGame.score)
    freezeAliens()
}

function freezeAliens() {
    gIsAlienFreeze = true
    setTimeout(() => {
        gIsAlienFreeze = false
    }, FREEZE_DURATION)
}