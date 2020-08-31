
function init() {
  // Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []
  
  // Grid Variables
  const width = 10
  const cellCount = width * width

  // Player starting positon
  let humanPosition = 11
  let snakePosition = 88

  // Scoreboard
  const scoreDisplay = document.getElementById('score')
  let score = 0

  //Teleporter Variables
  let teleporterDirection 
  const teleporterLocationArray = []
  let teleporterLocation

  //------------------------------------------------------------------------------------------------------

  // Map Layout

  // 0 = Wall
  // 1 = Strength
  // 2 = Placeholder
  // 3 = Sword
  // 4 = Stairs/Teleporter
  const mapLayout  = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 3, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  // RNG wallTile blocks inside the grid
  for (let i = 0; i < mapLayout.length; i++) {
    if (mapLayout[i] === 1) {
      if (Math.random() < 0.4
      && mapLayout[i - 1] === 1
      && mapLayout[i + 1]  === 1
      && mapLayout[i - 10]  === 1
      && mapLayout[i + 10]  === 1
      && mapLayout[i - 11]  === 1
      && i !== 11) mapLayout[i] = 0
    }
  }

  // Randomise whether the top-bottom or left-right teleporter spawn.
  if (Math.random() < 0.5) teleporterDirection = 'top-down'
  else teleporterDirection = 'left-right'

  //Changes the number in the mapLayout array to 4 in a randomised fashion, utilsiing the 'top-down' || 'left-right' function
  function drawTeleporter() {
    if (teleporterDirection === 'left-right') {
      // Generates a random number between 10 and 80
      const leftWallNum = (Math.floor(Math.random() * 8) + 1) * 10
      // Generates a random number between 19 and 89
      const rightWallNum = (Math.floor(Math.random() * 8) + 1) * 10 + 9
      mapLayout[leftWallNum] = 4
      mapLayout[rightWallNum] = 4
    } else {
      // Generates a random number between 1 and 8
      const topWallNum = (Math.floor(Math.random() * 8) + 1)
      // Generates a random number between 91 and 98
      const bottomWallNum = (Math.floor(Math.random() * 8) + 1) + 90
      mapLayout[topWallNum] = 4
      mapLayout[bottomWallNum] = 4
    }
  }
  drawTeleporter()

  // Create Div Grid
  function createGrid(startingPosition) {

    //Create Grid
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)

      //Add MapLayout -- links the number on the mapLayout array with the CSS elements
      if (mapLayout[i] === 0) {
        cells[i].classList.add('wallTile')
      } else if (mapLayout[i] === 1) {
        cells[i].classList.add('strengthTile')
      } else if (mapLayout[i] === 2) {
        cells[i].classList.add('unusedPlaceholder')
      } else if (mapLayout[i] === 3) {
        cells[i].classList.add('swordTile')
      } else if (mapLayout[i] === 4) {
        cells[i].classList.add('stairs_east')
      }
    }
    addHuman(startingPosition)
  }

  // Add and Remove Player Function
  function addHuman(position) {
    cells[position].classList.add('humanSprite')
  }
  function removeHuman(position) {
    cells[position].classList.remove('humanSprite')
  }

  //Find which cells in mapLayout contain the teleporter - creates an array containing the 2 values
  for (let i = 0; i < mapLayout.length; i++) {
    teleporterLocation = (mapLayout[i] === 4)
    if (teleporterLocation) 
      teleporterLocationArray.push(i) 
  }


  // Handle PlayerInput -------------------------------------------------------------------------------------
  function handleKeyUp(event) {

    removeHuman(humanPosition) // * remove Player from the current position

    const x = humanPosition % width // if Player / width has no remainder then dont move him left or right
    const y = Math.floor(humanPosition / width) // vertical version
    
    // Human Positioning, ArrowKeys/WASD, Teleporter
    switch (event.keyCode) { // Calculate the next position and update it
      case 39: //Arrow Right
        //Check Teleporter Function - Arrow Right
        if (teleporterLocationArray.indexOf(humanPosition + 1) >= 0) {
          const index = teleporterLocationArray.indexOf(humanPosition + 1)
          let newIndex

          if (index === 0) newIndex = 1
          else newIndex = 0

          humanPosition = teleporterLocationArray[newIndex]
        }
        // +1 Position, Right Arrow
        if (x < width - 1 && !cells[humanPosition + 1].classList.contains('wallTile')) humanPosition++
        break
      case 37: //Arrow Left
      // Check Teleporter Function --- Arrow Left
        if (teleporterLocationArray.indexOf(humanPosition - 1) >= 0) {
          const index = teleporterLocationArray.indexOf(humanPosition + 1)
          let newIndex

          if (index === 0) newIndex = 1
          else newIndex = 0

          humanPosition = teleporterLocationArray[newIndex]
        }
        // +1 Position, Left Arrow
        if (x > 0 && !cells[humanPosition - 1].classList.contains('wallTile')) humanPosition--
        break
      case 38: //Arrow Up
        // Check Teleporter Function --- Arrow Up
        if (teleporterLocationArray.indexOf(humanPosition - 10) >= 0) {
          const index = teleporterLocationArray.indexOf(humanPosition + 1)
          let newIndex

          if (index === 0) newIndex = 1
          else newIndex = 0

          humanPosition = teleporterLocationArray[newIndex]
        }
        //Arrow Up +1 Space
        if (y > 0 && !cells[humanPosition - 10].classList.contains('wallTile')) humanPosition -= width 
        break
      case 40: //Arrow Down
      //Check Teleporter Function --- Arrow Down
        if (teleporterLocationArray.indexOf(humanPosition + 10) >= 0) {
          const index = teleporterLocationArray.indexOf(humanPosition + 1)
          let newIndex

          if (index === 0) newIndex = 1
          else newIndex = 0

          humanPosition = teleporterLocationArray[newIndex]
        }
        if (y < width - 1 && !cells[humanPosition + 10].classList.contains('wallTile')) humanPosition += width 
        break
      case 68: //D Key Right
      // Check Teleporter Function --- D Key Right
        if (teleporterLocationArray.indexOf(humanPosition + 1) >= 0) {
          const index = teleporterLocationArray.indexOf(humanPosition + 1)
          let newIndex

          if (index === 0) newIndex = 1
          else newIndex = 0

          humanPosition = teleporterLocationArray[newIndex]
        }
        if (x < width - 1 && !cells[humanPosition + 1].classList.contains('wallTile')) humanPosition++
        break
      case 65: //A Key Left
      // Check Teleporter Function --- A Key Left
        if (teleporterLocationArray.indexOf(humanPosition - 1) >= 0) {
          const index = teleporterLocationArray.indexOf(humanPosition + 1)
          let newIndex

          if (index === 0) newIndex = 1
          else newIndex = 0

          humanPosition = teleporterLocationArray[newIndex]
        }
        if (x > 0 && !cells[humanPosition - 1].classList.contains('wallTile')) humanPosition--
        break
      case 87: //W Key Up
      // Check Teleporter Function --- W Key Up
        if (teleporterLocationArray.indexOf(humanPosition - 10) >= 0) {
          const index = teleporterLocationArray.indexOf(humanPosition + 1)
          let newIndex

          if (index === 0) newIndex = 1
          else newIndex = 0

          humanPosition = teleporterLocationArray[newIndex]
        }
        if (y > 0 && !cells[humanPosition - 10].classList.contains('wallTile')) humanPosition -= width
        break
      case 83: //S Key Down
      // Check Teleporter Function --- S Key Down
        if (teleporterLocationArray.indexOf(humanPosition + 10) >= 0) {
          const index = teleporterLocationArray.indexOf(humanPosition + 1)
          let newIndex

          if (index === 0) newIndex = 1
          else newIndex = 0

          humanPosition = teleporterLocationArray[newIndex]
        }
        if (y < width - 1 && !cells[humanPosition + 10].classList.contains('wallTile')) humanPosition += width
        break
      default:
    }
    addHuman(humanPosition) // Add the player back into the new position
    strengthConsumption() // Strength(10pts) Tracker
    swordConsumption() // Sword(100pts & Fear) Tracker
  }
  createGrid(humanPosition)


  // Enemy Creation/AI ------------------------------------------------------------------------

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
    new Snake('Greed', 88, 250)
  ]
  
  snakes.forEach(snake => {
    cells[snake.currentIndex].classlist.add(snake.className)
    cells[snake.currentIndex].classlist.add('snake')
  })





  function strengthConsumption() {
    if (cells[humanPosition].classList.contains('strengthTile')) {
      score += 10
      scoreDisplay.innerHTML = score
      cells[humanPosition].classList.remove('strengthTile')
      
    }
  }

  function swordConsumption() {
    if (cells[humanPosition].classList.contains('swordTile')) {
      score += 100
      scoreDisplay.innerHTML = score
      cells[humanPosition].classList.remove('swordTile')
      //NEED TO ADD IN FEARING MECHANIC AFTER BOTS IS COMPLETED
    }
  }




  // ----- Event listeners ------
  document.addEventListener('keyup', handleKeyUp)

  
}

window.addEventListener('DOMContentLoaded', init)