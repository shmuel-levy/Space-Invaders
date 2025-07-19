# Space Invaders Game

A modern implementation of the classic Space Invaders arcade game built with vanilla JavaScript, HTML5, and CSS3. This project demonstrates proficiency in front-end development, game logic implementation, and responsive design principles.

## Live Demo

[Play the Game](https://shmuel-levy.github.io/space-invaders)

## Project Overview

This Space Invaders game is a complete, playable implementation featuring modern web technologies and responsive design. The game includes advanced features such as multiple weapon systems, power-ups, and dynamic alien movement patterns.

## Features

### Core Gameplay
- Classic Space Invaders mechanics with modern enhancements
- Responsive design that works across desktop and mobile devices
- Real-time collision detection and physics
- Dynamic alien movement with edge detection and downward progression

### Advanced Features
- **Multiple Weapon Systems**: Regular laser, super laser mode, and neighbor damage shots
- **Power-up System**: Candy collectibles that provide points and temporary alien freeze
- **Limited Resources**: Strategic use of super attacks (3 per game) and neighbor shots (1 per game)
- **Audio Integration**: Background music and sound effects for immersive experience
- **Interactive Help System**: Comprehensive controls guide accessible during gameplay

### Technical Features
- Modular JavaScript architecture with separated concerns
- Responsive CSS Grid and Flexbox layouts
- Cross-browser compatibility
- Performance-optimized rendering
- Clean, maintainable code structure

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Audio**: Web Audio API
- **Responsive Design**: Mobile-first approach
- **Version Control**: Git

## Game Controls

| Key | Action |
|-----|--------|
| Left/Right Arrow | Move ship horizontally |
| Spacebar | Fire regular laser |
| N | Fire neighbor damage shot (1 use per game) |
| X | Activate super mode (3 uses per game) |
| H | Show help screen |
| ESC | Close modals |

## Game Mechanics

### Scoring System
- **Alien Destruction**: 10 points per alien
- **Candy Collection**: 50 points per candy
- **Total Aliens**: 24 aliens (3 rows × 8 columns)

### Power-ups
- **Candy**: Appears randomly in the top row, provides 50 points and 5-second alien freeze
- **Super Mode**: Faster, more powerful shots with limited uses
- **Neighbor Shot**: Damages aliens in surrounding cells for strategic gameplay

### Win/Loss Conditions
- **Victory**: Destroy all 24 aliens
- **Defeat**: Aliens reach the player's row

## Project Structure

```
Space-Invaders/
├── index.html              # Main HTML structure
├── css/
│   └── main.css            # Styling and responsive design
├── js/
│   ├── utils.js            # Game constants and utility functions
│   ├── game.js             # Core game logic and state management
│   ├── player.js           # Player controls and shooting mechanics
│   ├── invader.js          # Alien movement and collision detection
│   └── candy.js            # Power-up system implementation
├── Sound/                  # Audio assets
├── images/                 # Visual assets
└── README.md               # Project documentation
```

## Development Approach

### Code Organization
- **Separation of Concerns**: Each JavaScript file handles specific game functionality
- **Modular Design**: Reusable functions and clean interfaces
- **Error Handling**: Comprehensive validation and error management
- **Performance Optimization**: Efficient rendering and memory management

### Responsive Design
- **Mobile-First**: Designed for mobile devices with desktop enhancements
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive positioning
- **Touch-Friendly**: Optimized for both keyboard and touch input
- **Cross-Platform**: Consistent experience across different devices

### User Experience
- **Intuitive Controls**: Clear, accessible control scheme
- **Visual Feedback**: Immediate response to user actions
- **Help System**: Comprehensive in-game assistance
- **Smooth Animations**: Polished visual effects and transitions

## Installation and Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/space-invaders.git
   cd space-invaders
   ```

2. Open the project:
   - Double-click `index.html` to open in browser
   - Or serve with a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

3. Navigate to `http://localhost:8000` in your browser

## Browser Compatibility

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## Performance Considerations

- **Optimized Rendering**: Efficient DOM manipulation and updates
- **Memory Management**: Proper cleanup of intervals and event listeners
- **Audio Optimization**: Compressed audio files and efficient playback
- **Responsive Images**: Optimized image assets for fast loading

## Future Enhancements

- **High Score System**: Local storage for persistent scores
- **Multiple Levels**: Progressive difficulty with different alien patterns
- **Sound Settings**: Volume controls and audio preferences
- **Mobile Touch Controls**: Enhanced touch interface for mobile devices
- **Leaderboard**: Online score tracking and competition

## Contributing

This project is open for contributions. Please feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License.

## Author

**Shmuel Levy**

- **GitHub**: [shmuel-levy](https://github.com/shmuel-levy)
- **Portfolio**: [Personal Website](https://shmuel-levy.github.io)

---

*This project demonstrates proficiency in modern web development, game programming, and user experience design. Built with attention to detail and professional coding standards.* 
