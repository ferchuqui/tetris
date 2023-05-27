document.addEventListener('DOMContentLoaded',() =>{
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10

  //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]
  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
  let currentPosition = 4
  let currentRotation = 0

  //Selecciona un tetromino al azar y su primera rotacion
  let random = Math.floor(Math.random()*theTetrominoes.length)
  console.log(random)
  let current = theTetrominoes[random][currentRotation]

  //draw the Tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }
  function undraw(){
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }
  //el tetromino se movera cada segundo

  timerId = setInterval(moveDown, 1000)




  //Asignacion de funciones a las teclas
  function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      //rotate()
    } else if (e.keyCode === 39){
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }

  }
  document.addEventListener('keyup', control)

  //move down function
  function moveDown() {
    undraw ()
    currentPosition += width
    draw()
    freeze()
  }

  //freeze function
  function freeze(){
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    //start a new tetromino cayendo
    random = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
  }
}

//Mover el tetromino hacia la izquierda, hasta el borde o que se bloquee
undraw()
const isAtleftEdge = current.some(index => (currentPosition + index) % width === 0)

if(!isAtleftEdge) currentPosition -=1

if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
  currentPosition +=1
}
draw()
}
//Mover el tetromino hacia la derecha, hasta el borde o que se bloquee

  function moveRight(){
    undraw()
    const isAtrightEdge = current.some(index =>(currentPosition + index) % width === width -1)
    if(!isAtrightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
  }
)