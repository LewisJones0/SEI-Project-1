
function init() {
  // Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []
  
  // Grid Variables
  const width = 10
  const cellCount = width * width

  // Player starting positon
  let humanPosition = 74

  // Add and Remove Player Functionality

  function addHuman(position) {
    cells[position].classList.add('humanSprite')
  }

  function removeHuman(position) {
    cells[position].classList.remove('humanSprite')
  }

  // Create Div Grid

  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addHuman(startingPosition)
  }

// ------- Handle PlayerInput --------

  function handleKeyUp(event) {

    removeHuman(humanPosition) // * remove Player from the current position

    const x = humanPosition % width // if Player / width has no remainder then dont move him left or right
    const y = Math.floor(humanPosition / width) // vertical versionb
    
    // Human Position and ArrowKeys/WASD
    switch (event.keyCode) { // * calculate the next position and update it
      case 39: //arrow right
        if (x < width - 1) 
        humanPosition++ 
        break
      case 37: //arrow left
        if (x > 0) humanPosition--
        break
      case 38: //arrow up
        if (y > 0) humanPosition -= width
        break
      case 40: //arrow down
        if (y < width - 1) humanPosition += width
        break
        case 68: //d right
        if (x < width - 1) humanPosition++
        break
      case 65: //a left
        if (x > 0) humanPosition--
        break
      case 87: //w up
        if (y > 0) humanPosition -= width
        break
      case 83: //s down
        if (y < width - 1) humanPosition += width
        break
      default:
    }
    addHuman(humanPosition) // Add the player back into the new position
  }
  createGrid(humanPosition)

// ---------- Draw Map Function -------------

const biblicLayout = new Object()
biblicLayout.WALL       = 0;
biblicLayout.EMPTY      = 1;
biblicLayout.STRENGTH   = 2;
biblicLayout.BLOCK      = 3;
biblicLayout.SWORD      = 4;
biblicLayout.mapLayout  = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    function drawMap(cells) {
      const gridList = document.querySelectorAll('.grid div')
      for (let i=0; i < gridList.length; i++) {
      if (biblicLayout.mapLayout[i] === 0) {
        console.log('working')
        // cells[position].classList.remove('humanSprite')
        } else if (biblicLayout.mapLayout[i] === 1){
          console.log('working2')
        }
      }
    }

    drawMap()


    // Enemy Constructor
    class Snake {
      constructor(className, startIndex, speed) {
        this.className = className //Snake Name/Class
        this.startIndex = startIndex //Starting Position
        this.speed = speed //Speed in ms
        this.currentIndex = startIndex // Current Position
        this.isScared = false //Player can kill
        this.timerId = NaN  //Movement
      }
    }
    // All Enemies 
    const snakes = [
      new Snake('Lust', 11, 250),
      new Snake('Greed', 12, 250),
      new Snake('Shame', 13, 250),
      new Snake('Envy', 14, 250)
    ]
    console.log(snakes)

    // Draw Snakes on map
    snakes.forEach(snake => {
      cells[Snake.currentIndex].classList.add(snake.className)
      cells[Snake.currentIndex].classList.add('snake')
    })
    console.log(Snake)



// const backgroundArray = cells.map(eachDiv => {
//   console.log(typeof eachDiv)
//   return (eachDiv)
// })
// console.log(backgroundArray)








  // ----- Event listeners ------
  document.addEventListener('keyup', handleKeyUp)

  
}

window.addEventListener('DOMContentLoaded', init)