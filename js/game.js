'use strict'

var gGame
var gBoard
var gInvadersInterval
var gIsMobile = false
var gTouchStartX = 0
var gTouchStartY = 0
var gIsDragging = false
var shootSound = new Audio('Sound/blaster-2-81267.mp3')
var backgroundMusicMenu = new Audio('Sound/spaceship-cruising-ufo-7176.mp3')
var backgroundMusic = new Audio("Sound/invasion-march-star-wars-style-cinematic-music-219585.mp3")

function init() {
    detectMobile()
    setupTouchControls()
    showMenu()
    if (backgroundMusicMenu) {
        backgroundMusicMenu.play().catch(e => console.log('Menu music failed to play:', e))
    }
}

function detectMobile() {
    gIsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                window.innerWidth <= 768
}

function setupTouchControls() {
    if (!gIsMobile) return
    
    const boardContainer = document.querySelector('.board-container')
    if (boardContainer) {
        boardContainer.addEventListener('touchstart', handleTouchStart, { passive: false })
        boardContainer.addEventListener('touchmove', handleTouchMove, { passive: false })
        boardContainer.addEventListener('touchend', handleTouchEnd, { passive: false })
    }
}

function handleTouchStart(event) {
    if (event.target.classList.contains('mobile-btn')) return
    
    event.preventDefault()
    const touch = event.touches[0]
    gTouchStartX = touch.clientX
    gTouchStartY = touch.clientY
    gIsDragging = true
}

function handleTouchMove(event) {
    if (!gIsDragging || event.target.classList.contains('mobile-btn')) return
    
    event.preventDefault()
    const touch = event.touches[0]
    const deltaX = touch.clientX - gTouchStartX
    const deltaY = touch.clientY - gTouchStartY
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        if (deltaX > 0) {
            moveHero({ key: 'ArrowRight' })
        } else {
            moveHero({ key: 'ArrowLeft' })
        }
        gTouchStartX = touch.clientX
    }
}

function handleTouchEnd(event) {
    if (event.target.classList.contains('mobile-btn')) return
    
    gIsDragging = false
}

function handleTouchStart(action) {
    if (!gGame || !gGame.isOn) return
    
    switch(action) {
        case 'left':
            moveHero({ key: 'ArrowLeft' })
            break
        case 'right':
            moveHero({ key: 'ArrowRight' })
            break
        case 'fire':
            if (!gHero.isShoot) {
                shoot(gHero.pos)
            }
            break
        case 'n':
            if (!gHero.isShoot && gHero.neighborShotsLeft > 0) {
                shootWithNeighbors(gHero.pos)
            }
            break
        case 'x':
            if (gHero.superAttacksLeft > 0) {
                activateSuperMode()
            }
            break
    }
}

function handleTouchEnd(action) {
    // Touch end handling for continuous actions if needed
}

function startGame() {
    document.querySelector('.menu').style.display = 'none'
    document.querySelector('.board-container').style.display = 'table'
    document.querySelector('.headers').style.display = 'block'
    
    if (gIsMobile) {
        document.querySelector('.mobile-controls').style.display = 'block'
    }
    
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
    const mobileControls = document.querySelector('.mobile-controls')
    
    if (menu) menu.style.display = 'block'
    if (boardContainer) boardContainer.style.display = 'none'
    if (headers) headers.style.display = 'none'
    if (mobileControls) mobileControls.style.display = 'none'
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