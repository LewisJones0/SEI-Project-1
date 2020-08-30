
function init() {
  // Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []
  
  // Grid Variables
  const width = 10
  const cellCount = width * width

  // Player starting positon
  let humanPosition = 74

  // Scoreboard
  const scoreDisplay = document.getElementById('score')
  let score = -10

  let teleporterDirection 


  // ---------- Draw Map Function -------------

  const biblicLayout = new Object()
  biblicLayout.WALL       = 0
  biblicLayout.STRENGTH   = 1
  biblicLayout.EMPTY      = 2
  biblicLayout.SWORD      = 3
  biblicLayout.mapLayout  = [
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

  // RNG wall1 blocks inside the grid
  for (let i = 0; i < biblicLayout.mapLayout.length; i++) {
    if (biblicLayout.mapLayout[i] === 1) {
      if (Math.random() < 0.4
      && biblicLayout.mapLayout[i - 1] === 1
      && biblicLayout.mapLayout[i + 1]  === 1
      && biblicLayout.mapLayout[i - 10]  === 1
      && biblicLayout.mapLayout[i + 10]  === 1
      && biblicLayout.mapLayout[i - 11]  === 1
      && i !== 74) biblicLayout.mapLayout[i] = 0
    }
  }

  // Random top-bottom or left-right teleport spawn.
  if (Math.random() < 0.5) teleporterDirection = 'top-down'
  else teleporterDirection = 'left-right'

  function drawTeleporter() {
    if (teleporterDirection === 'left-right') {
      // Generates a random number between 10 and 80
      const leftWallNum = (Math.floor(Math.random() * 8) + 1) * 10
      const rightWallNum = (Math.floor(Math.random() * 8) + 1) * 10 + 9
      biblicLayout.mapLayout[leftWallNum] = 4
      biblicLayout.mapLayout[rightWallNum] = 4
    } else {
      const topWallNum = (Math.floor(Math.random() * 8) + 1)
      const bottomWallNum = (Math.floor(Math.random() * 8) + 1) + 90
      biblicLayout.mapLayout[topWallNum] = 4
      biblicLayout.mapLayout[bottomWallNum] = 4
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

      //Add MapLayout
      if (biblicLayout.mapLayout[i] === 0) {
        cells[i].classList.add('wall1')
      } else if (biblicLayout.mapLayout[i] === 1) {
        cells[i].classList.add('wall2')
      } else if (biblicLayout.mapLayout[i] === 2) {
        cells[i].classList.add('wall3')
      } else if (biblicLayout.mapLayout[i] === 3) {
        cells[i].classList.add('wall4')
      } else if (biblicLayout.mapLayout[i] === 4) {
        cells[i].classList.add('wall3')
      }
    }
    addHuman(startingPosition)
  }

  // Add and Remove Player Functionality

  function addHuman(position) {
    cells[position].classList.add('humanSprite')
  }
  
  function removeHuman(position) {
    cells[position].classList.remove('humanSprite')
  }



  // ------- Handle PlayerInput --------

  function handleKeyUp(event) {

    removeHuman(humanPosition) // * remove Player from the current position

    const x = humanPosition % width // if Player / width has no remainder then dont move him left or right
    const y = Math.floor(humanPosition / width) // vertical version
    
    // Human Position and ArrowKeys/WASD
    switch (event.keyCode) { // * calculate the next position and update it
      case 39: //arrow right
        // if (check if player would step on wall 4) then move it to the opposite teleport.
        if (x < width - 1 && !cells[humanPosition + 1].classList.contains('wall1') && !cells[humanPosition + 1].classList.contains('wall3')) humanPosition++
        break
      case 37: //arrow left
        if (x > 0 && !cells[humanPosition - 1].classList.contains('wall1')) humanPosition--
        break
      case 38: //arrow up
        if (y > 0 && !cells[humanPosition - 10].classList.contains('wall1')) humanPosition -= width 
        break
      case 40: //arrow down
        if (y < width - 1 && !cells[humanPosition + 10].classList.contains('wall1')) humanPosition += width 
        break
      case 68: //d right
        if (x < width - 1 && !cells[humanPosition + 1].classList.contains('wall1')) humanPosition++
        break
      case 65: //a left
        if (x > 0 && !cells[humanPosition - 1].classList.contains('wall1')) humanPosition--
        break
      case 87: //w up
        if (y > 0 && !cells[humanPosition - 10].classList.contains('wall1')) humanPosition -= width
        break
      case 83: //s down
        if (y < width - 1 && !cells[humanPosition + 10].classList.contains('wall1')) humanPosition += width
        break
      default:
    }
    addHuman(humanPosition) // Add the player back into the new position
    strengthConsumption() // Strength(10pts) Tracker
    swordConsumption() // Sword(100pts & Fear) Tracker
  }
  createGrid(humanPosition)
  



  // function drawMap() {
  //   const gridList = document.querySelectorAll('.grid div')
  //   for (let i = 0; i < gridList.length; i++) {
  //     if (biblicLayout.mapLayout[i] === 0) {
  //       console.log('working')
  //       // cells[position].classList.remove('humanSprite')
  //     } else if (biblicLayout.mapLayout[i] === 1){
  //       console.log('working2')
  //     }
  //   }
  // }

  // drawMap()


  // Enemy Constructor
  // class Snake {
  //   constructor(className, startIndex, speed) {
  //     this.className = className //Snake Name/Class
  //     this.startIndex = startIndex //Starting Position
  //     this.speed = speed //Speed in ms
  //     this.currentIndex = startIndex // Current Position
  //     this.isScared = false //Player can kill
  //     this.timerId = NaN  //Movement
  //   }
  // }
  // // All Enemies 
  // const snakes = [
  //   new Snake('Lust', 11, 250),
  //   new Snake('Greed', 12, 250),
  //   new Snake('Shame', 13, 250),
  //   new Snake('Envy', 14, 250)
  // ]

  // Draw Snakes on map
  // snakes.forEach(snake => {
  //   cells[Snake.currentIndex].classList.add(snake.className)
  //   cells[Snake.currentIndex].classList.add('snake')
  // })
  // console.log(Snake)



  // const backgroundArray = cells.map(eachDiv => {
  //   console.log(typeof eachDiv)
  //   return (eachDiv)
  // })
  // console.log(backgroundArray)


  function strengthConsumption() {
    if (cells[humanPosition].classList.contains('wall2')) {
      score += 10
      scoreDisplay.innerHTML = score
      cells[humanPosition].classList.remove('wall2')
      
    }
  }

  function swordConsumption() {
    if (cells[humanPosition].classList.contains('wall4')) {
      score += 100
      scoreDisplay.innerHTML = score
      cells[humanPosition].classList.remove('wall4')
      //NEED TO ADD IN FEARING MECHANIC AFTER BOTS IS COMPLETED
    }
  }




  // ----- Event listeners ------
  document.addEventListener('keyup', handleKeyUp)

  
}

window.addEventListener('DOMContentLoaded', init)