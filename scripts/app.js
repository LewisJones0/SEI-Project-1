
function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []

  // * grid variables
  const width = 10
  const cellCount = width * width

  // * game variables
  let humanPosition = 0


  function addHuman(position) {
    cells[position].classList.add('humanSprite')
  }

  function removeHuman(position) {
    cells[position].classList.remove('humanSprite')
  }

  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addHuman(startingPosition)
  }

  function handleKeyUp(event) {

    removeHuman(humanPosition) // * remove pikachu from the current position

    const x = humanPosition % width // if pika / width has no remainder then dont move him left or right
    const y = Math.floor(humanPosition / width) // vertical
    
    // Human Position and ArrowKeys/WASD
    switch (event.keyCode) { // * calculate the next position and update it
      case 39: //arrow right
        if (x < width - 1) humanPosition++
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

    addHuman(humanPosition) // * add pikachu back at the new position
  }


  createGrid(humanPosition)

  // ----- Event listeners ------
  document.addEventListener('keyup', handleKeyUp)
}

window.addEventListener('DOMContentLoaded', init)