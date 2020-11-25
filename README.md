# SEI Project One: 
![BiblicalExample](/assets/README-content/BiblicalTitle.png)

Deployed Game: https://lewisjones0.github.io/SEI-Project-1-Biblical/

## TLDR
- **Project Duration** - 8 Days
- **Game Choice** - Pac Man
- **Game Theme** - Biblical/Snakes/DungeonCrawler
- **Technologies Used** - HTML, CSS & Vanilla JS (ES5 & ES6)
- **Developer Tools** - VSCode, Eslint, Git, Github
- **Teammates** - Solo Project
____

### Brief
- Render a 10x10 grid
- Randomised wall tiles inside the interior 8x8 section
- Two randomised staircase tiles that always spawns on the opposite side to eachother
- Spawn player and two snakes
- Logic for player movement and snake movement
- Point system
- Win/Lose logic 
- Menu system for game start, game lost and game won

____

## Game Example

![BiblicalExample](/assets/README-content/BiblicalExample.gif)
____

# Abstract: Inital Thoughts and Project Overview

The first project I did at General Assembly was to develop a game from a selection of 90's classics. Initally I was planning on doing a version of Snake but after some consideration and push from my mentors, I decided to pivot and do an alternative version of Pac-Man. 

This version of Pacman was inspired by Christian and Ancient Greek stories as well as Dungeon Crawler video games from around the 1990's.

____


## Game Design

The game is about a protagonist that is decending down the levels of a crypt. The game itself represents one level that the protangonist finds himself in. 

  ![Player](/assets/README-content/Player.png)

### Lose Condition

The enemies of the player were demonic snakes - these snakes would one shot the player if they came into contact with him.

  ![GreenSnake](/assets/README-content/greenSnake.gif) ![BrownSnake](/assets/README-content/brownSnake.gif)

### Win Condition

In order to win the game, the player must walk over all of the strength & sanity tiles on the map. 

____


The story of the player descending down the crypt introduces interesting game aesthetics that I was able to animate with CSS. 

An example of this was as the story character was fighting monsters down each level, he had reduced sanity and strength. Implementing a shaking animation on the tiles to simulate the the experience of insanity brought more life to the game.

  ![TileVib](/assets/README-content/Tile_Vibration.gif)

____

# Successes, Challenges and Bugs

Overall I am very happy with how this project came out at the end given the 8 day time limit. The biggest win I had was the exposure I gained of JavaScript by developing and implementing a end-to-end browser based game that is fully functional (albiet a few minor bugs that will get covered soon)
____

## Challenges

### Learning about script complexity and organisation

The biggest challenge I faced on a macro level was visualising the complexity of the JavaScript file as it gathered in complexity. As all of the functions were located in one file, the script was constantly jumping between many functions. This showcased to me that I had to spend more time in script organisation for my subsequent projects, and on top of that, start seperating certain functions inside more files.
____
### Code Example
____
One of the biggest challenges I faced while developing this game was the randomisation functionality on the tile sets.

Utilising the map layout const to spawn random wall tiles inside the 8x8 grid was relatively easy. The problem with this was that due to its randomised nature. The Math.random would spawn alot of clashing walls where it would make the game unplayable. 

Example: Putting tiles next to the player so they could not move out of the spawn location, putting walls around a score tile so the game could not be completed.

To combat this, I had to develop logic to stop the Math.random function to not spawn a wall tile in a area where there is a wall north, east, south or west of it already. 

Finished code below:

  ![CodeExample](/assets/README-content/CodeExample.png)
____
### Bugs
There was a few bugs I was unable to fix within the time limit of the project. The vast majority of the functionality was working other then a few minor points.

- Game continued to run regardless of the win/loss condition (Visual overlay provides the illusion of game-end)
- After the player plays the first game and starts a new game, the script just performs the loss function 
- The game has a slight visualisation bug when the player picks up the illusionary sword - the grid shifts direction slightly
____

### Extra Features

1. Fix the bugs described above
2. Add additional difficulties (More snakes, smarter snake moves)
3. Add new tile sets for each difficulties (Graphics)
4. Add more numbers of tiles (say go from 10x10 to 20x20)
____