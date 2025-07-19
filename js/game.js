'use strict'

var gGame
var gBoard
var gInvadersInterval
var shootSound = new Audio('Sound/blaster-2-81267.mp3')
var backgroundMusicMenu = new Audio('Sound/spaceship-cruising-ufo-7176.mp3')
var backgroundMusic = new Audio("Sound/invasion-march-star-wars-style-cinematic-music-219585.mp3")

function init() {
    showMenu()
    if (backgroundMusicMenu) {
        backgroundMusicMenu.play().catch(e => console.log('Menu music failed to play:', e))
    }
}

function startGame() {
    document.querySelector('.menu').style.display = 'none'
    document.querySelector('.board-container').style.display = 'table'
    document.querySelector('.headers').style.display = 'block'
    
    if (backgroundMusicMenu) {
        backgroundMusicMenu.pause()
    }
    if (backgroundMusic) {
        backgroundMusic.play().catch(e => console.log('Background music failed to play:', e))
    }
    
    gGame = {
        isOn: true,
        isVictory: false,
        alienCount: 0,
        score: 0
    }
    
    gBoard = buildBoard()
    createInvaders(gBoard)
    createHero(gBoard)
    renderBoard(gBoard)
    updateScore(gGame.score)
    startCandySpawn()

    gAliensTopRow = 0
    gAliensBottomRow = ALIEN_ROW_COUNT - 1
    gAlienMoveDirection = 'right'
    gIsAlienFreeze = false

    if (gInvadersInterval) {
        clearInterval(gInvadersInterval)
    }
    gInvadersInterval = setInterval(moveInvaders, ALIEN_SPEED)
}

function buildBoard() {
    const board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([])
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = SKY
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            const cell = board[i][j]
            const cellClass = i === board.length - 1 ? 'cell floor' : 'cell'
            strHTML += `<td class="${cellClass}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    if (elContainer) {
        elContainer.innerHTML = strHTML
    }
}

function gameOver(isWin) {
    gGame.isOn = false
    gGame.isVictory = isWin
    
    if (gInvadersInterval) {
        clearInterval(gInvadersInterval)
        gInvadersInterval = null
    }
    
    stopCandySpawn()
    
    if (backgroundMusic) {
        backgroundMusic.pause()
    }
    
    const message = isWin ? "You Won! Congratulations!" : "Game Over! Try again!"
    openModal(message)
}

function openModal(message) {
    const modal = document.querySelector('.modal')
    const msgElement = document.querySelector('.modal .msg')
    if (modal && msgElement) {
        modal.style.display = "block"
        msgElement.innerText = message
    }
}

function closeModal() {
    const modal = document.querySelector('.modal')
    if (modal) {
        modal.style.display = "none"
    }
}

function showControls() {
    const controlsModal = document.querySelector('.controls-modal')
    if (controlsModal) {
        controlsModal.style.display = "block"
    }
}

function hideControls() {
    const controlsModal = document.querySelector('.controls-modal')
    if (controlsModal) {
        controlsModal.style.display = "none"
    }
}

function backToMenu() {
    closeModal()
    
    if (gInvadersInterval) {
        clearInterval(gInvadersInterval)
        gInvadersInterval = null
    }
    
    if (gLaserInterval) {
        clearInterval(gLaserInterval)
        gLaserInterval = null
    }
    
    stopCandySpawn()
    
    if (backgroundMusic) {
        backgroundMusic.pause()
    }
    
    showMenu()
}

function restartGame() {
    closeModal()
    
    gHero.superAttacksLeft = 3
    gHero.neighborShotsLeft = 1
    gHero.isSuperMode = false
    gHero.isShoot = false
    updateSuperAttacksDisplay()
    updateNeighborShotsDisplay()
    
    if (gLaserInterval) {
        clearInterval(gLaserInterval)
        gLaserInterval = null
    }
    
    startGame()
}

function showMenu() {
    const menu = document.querySelector('.menu')
    const boardContainer = document.querySelector('.board-container')
    const headers = document.querySelector('.headers')
    
    if (menu) menu.style.display = 'block'
    if (boardContainer) boardContainer.style.display = 'none'
    if (headers) headers.style.display = 'none'
}

function checkGameOver() {
    if (!gGame || !gGame.isOn) return
    
    const heroRow = gBoard.length - 2
    for (let j = 0; j < BOARD_SIZE; j++) {
        if (gBoard[heroRow][j] === INVADER) {
            gameOver(false)
            return
        }
    }
}