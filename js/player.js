'use strict'

var gHero = {
    pos: { i: 12, j: 5 },
    isShoot: false,
    superAttacksLeft: 3,
    neighborShotsLeft: 1,
    isSuperMode: false
}

var gLaserInterval

function createHero(board) {
    gHero.pos.i = board.length - 2
    gHero.pos.j = Math.floor(board[board.length - 2].length / 2)
    board[gHero.pos.i][gHero.pos.j] = PLAYER
}

function moveHero(event) {
    if (!gGame || !gGame.isOn) return
    
    const playerPos = gHero.pos
    switch (event.key) {
        case 'ArrowLeft':
            if (playerPos.j > 0) {
                updateCell(gBoard, playerPos, SKY)
                playerPos.j--
                updateCell(gBoard, playerPos, PLAYER)
            }
            break
        case 'ArrowRight':
            if (playerPos.j < BOARD_SIZE - 1) {
                updateCell(gBoard, playerPos, SKY)
                playerPos.j++
                updateCell(gBoard, playerPos, PLAYER)
            }
            break
        case ' ':
            if (!gHero.isShoot) {
                shoot(playerPos)
            }
            break
        case 'n':
        case 'N':
            if (!gHero.isShoot && gHero.neighborShotsLeft > 0) {
                shootWithNeighbors(playerPos)
            }
            break
        case 'x':
        case 'X':
            if (gHero.superAttacksLeft > 0) {
                activateSuperMode()
            }
            break
        case 'h':
        case 'H':
            showControls()
            break
        case 'Escape':
            hideControls()
            closeModal()
            break
    }
}

function shoot(playerPos) {
    if (gHero.isShoot) return
    gHero.isShoot = true
    var laserPos = { i: playerPos.i - 1, j: playerPos.j }

    if (shootSound) {
        shootSound.play().catch(e => console.log('Audio play failed:', e))
    }

    const laserSymbol = gHero.isSuperMode ? SUPER_LASER : LASER
    const laserSpeed = gHero.isSuperMode ? SUPER_LASER_SPEED : REGULAR_LASER_SPEED

    gLaserInterval = setInterval(() => {
        if (isValidPosition(laserPos)) {
            updateCell(gBoard, laserPos, SKY)
        }
        
        laserPos.i--
        
        if (laserPos.i < 0 || !isValidPosition(laserPos)) {
            clearInterval(gLaserInterval)
            gHero.isShoot = false
            if (gHero.isSuperMode) {
                deactivateSuperMode()
            }
            return
        }
        
        const cellContent = gBoard[laserPos.i][laserPos.j]
        if (cellContent === INVADER || cellContent === CANDY) {
            clearInterval(gLaserInterval)
            gHero.isShoot = false
            
            if (cellContent === INVADER) {
                handleAlienHit(gBoard, laserPos)
            } else if (cellContent === CANDY) {
                handleCandyHit(laserPos)
            }
            
            if (gHero.isSuperMode) {
                deactivateSuperMode()
            }
            return
        }
        
        updateCell(gBoard, laserPos, laserSymbol)
    }, laserSpeed)
}

function shootWithNeighbors(playerPos) {
    if (gHero.isShoot || gHero.neighborShotsLeft <= 0) return
    gHero.isShoot = true
    gHero.neighborShotsLeft--
    updateNeighborShotsDisplay()
    
    var laserPos = { i: playerPos.i - 1, j: playerPos.j }

    if (shootSound) {
        shootSound.play().catch(e => console.log('Audio play failed:', e))
    }

    gLaserInterval = setInterval(() => {
        if (isValidPosition(laserPos)) {
            updateCell(gBoard, laserPos, SKY)
        }
        
        laserPos.i--
        
        if (laserPos.i < 0 || !isValidPosition(laserPos)) {
            clearInterval(gLaserInterval)
            gHero.isShoot = false
            return
        }
        
        if (gBoard[laserPos.i][laserPos.j] === INVADER) {
            clearInterval(gLaserInterval)
            gHero.isShoot = false
            handleAlienHitWithNeighbors(gBoard, laserPos)
            return
        }
        
        updateCell(gBoard, laserPos, LASER)
    }, REGULAR_LASER_SPEED)
}

function handleAlienHitWithNeighbors(board, pos) {
    const neighbors = [
        { i: pos.i - 1, j: pos.j },
        { i: pos.i + 1, j: pos.j },
        { i: pos.i, j: pos.j - 1 },
        { i: pos.i, j: pos.j + 1 },
        { i: pos.i - 1, j: pos.j - 1 },
        { i: pos.i - 1, j: pos.j + 1 },
        { i: pos.i + 1, j: pos.j - 1 },
        { i: pos.i + 1, j: pos.j + 1 },
    ]

    if (isValidPosition(pos) && board[pos.i][pos.j] === INVADER) {
        handleAlienHit(board, pos)
    }

    for (let neighbor of neighbors) {
        if (isValidPosition(neighbor) && board[neighbor.i][neighbor.j] === INVADER) {
            handleAlienHit(board, neighbor)
        }
    }
}

function activateSuperMode() {
    if (gHero.superAttacksLeft > 0) {
        gHero.isSuperMode = true
        gHero.superAttacksLeft--
        updateSuperAttacksDisplay()
    }
}

function deactivateSuperMode() {
    gHero.isSuperMode = false
}

function updateSuperAttacksDisplay() {
    const superAttacksDisplay = document.querySelector('.super-attacks')
    if (superAttacksDisplay) {
        superAttacksDisplay.textContent = `Super Attacks: ${gHero.superAttacksLeft}`
    }
}

function updateNeighborShotsDisplay() {
    const neighborShotsDisplay = document.querySelector('.neighbor-shots')
    if (neighborShotsDisplay) {
        neighborShotsDisplay.textContent = `Neighbor Shots: ${gHero.neighborShotsLeft}`
    }
}