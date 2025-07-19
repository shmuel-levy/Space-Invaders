# Space Invaders Game

A classic Space Invaders game built with HTML, CSS, and JavaScript.

## Features

- **Classic Gameplay**: Defend Earth from invading aliens
- **Multiple Weapons**: Regular laser and super laser modes
- **Power-ups**: Collect candy to freeze aliens temporarily
- **Scoring System**: Earn points for each alien destroyed
- **Sound Effects**: Immersive audio experience
- **Responsive Design**: Works on different screen sizes

## Controls

- **Arrow Keys**: Move left/right
- **Spacebar**: Shoot regular laser
- **N Key**: Shoot with neighbor damage (affects surrounding aliens)
- **X Key**: Activate super mode (faster, more powerful shots)

## Game Mechanics

### Aliens
- 3 rows of 8 aliens each (24 total)
- Move side-to-side and advance downward
- Game ends if aliens reach the player's row

### Player
- 3 super attacks per game
- Can shoot regular or super lasers
- Super mode provides faster, more powerful shots

### Power-ups
- **Candy (🍬)**: Appears randomly in the top row
- Collecting candy freezes aliens for 5 seconds
- Worth 50 points

### Scoring
- **Alien**: 10 points each
- **Candy**: 50 points each

## Recent Improvements

### Bug Fixes
- ✅ Fixed multiple aliens being killed with one shot
- ✅ Fixed game not ending when all aliens are destroyed
- ✅ Improved collision detection accuracy
- ✅ Fixed audio loading issues
- ✅ Added proper interval cleanup

### Code Organization
- ✅ Centralized all constants in `utils.js`
- ✅ Removed duplicate code across files
- ✅ Improved error handling and null checks
- ✅ Better separation of concerns
- ✅ Cleaner file structure

### Gameplay Enhancements
- ✅ More accurate alien boundary tracking
- ✅ Improved win condition logic
- ✅ Better super mode mechanics
- ✅ Enhanced candy spawning system
- ✅ More responsive controls

## File Structure

```
Space-Invaders/
├── index.html          # Main HTML file
├── css/
│   └── main.css        # Styling
├── js/
│   ├── utils.js        # Constants and utility functions
│   ├── game.js         # Main game logic
│   ├── player.js       # Player movement and shooting
│   ├── invader.js      # Alien movement and behavior
│   └── candy.js        # Power-up system
├── Sound/              # Audio files
└── images/             # Background images
```

## How to Play

1. Click "Start Game" to begin
2. Use arrow keys to move your ship
3. Press spacebar to shoot at aliens
4. Collect candy power-ups for temporary alien freeze
5. Use super attacks (X key) for powerful shots
6. Destroy all aliens to win!

## Credits

- **Developer**: Shmuel Levy
- **Audio**: Various space-themed sound effects
- **Icons**: Unicode emoji characters

---

Enjoy the game! 👾🚀 
