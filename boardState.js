const boardState = module.exports

const parseFood = (board) => {
  try {
    if(!board.food) return []
    return board.food.map((f) => {
      f.type = 'food'
      f.meal = true
      return f
    })
  } catch (err) {
    console.error('boardState parseFood - error parsing food data: ', err)
  }
}

const parseSnakes = (gameState) => {
  try {
    const snakes = []
    let type = 'snake'
    gameState.board.snakes.forEach((snake) => {
      if(snake.id === gameState.you.id) type = 'you'
      snake.body.forEach((segment, i) => {
        segment.type = type
        if(i === 0) {
          segment.part = 'head'
          if(type !== 'you' && snake.body.length < gameState.you.body.length) segment.meal = true
        }
        snakes.push(segment)
      })
    })
    return snakes
  } catch (err) {
    console.error('boardState parseSnakes - error parsing snake data: ', err)
  }
}
const parseBoardPoints = (gameState) => {
  try {
    return parseFood(gameState.board)
    .concat(parseSnakes(gameState))
  } catch (err) {
    console.error('boardState parseBoardPoints - error parsing points array data: ', err)
  }
}

const createBoardMap = (pointsArry, boardHeight, boardWidth) => {
  try{
    arry = []
  
    for(let i = 0; i < boardHeight; i++) {
      arry.push(rowGen())
    }

    pointsArry.forEach((point) => {
      let marker;
      if(point.type === 'food') {
        marker = 4
      } else if (point.type === 'you') {
        if(point.part === 'head') {
          marker = 1
        } else {
          marker = 5
        }
      } else if (point.type === 'snake') {
        if(point.part === 'head') {
          if(point.meal) {
            marker = 2
          } else {
            marker = 3
          }
        } else {
          marker = 5
        }
      }
      return arry[point.y][point.x] = marker
    })
  
    function rowGen() {
      let boardRow = []
      for(let i = 0; i < boardWidth; i ++) {
        boardRow.push(0)
      }
      return boardRow
    }
  
    return arry
  } catch (err) {
    console.error('boardState createBoardMap - error creating board array: ', err)
  }
}

boardState.visualize = (gameState, options) => {
  try{
    options = options ? options : {}
    options.showMySnake = typeof options.showMySnake !== 'undefined' ? options.showMySnake : true
    options.showBoard = typeof options.showBoard !== 'undefined' ? options.showBoard : true
    options.addBoard = typeof options.addBoard !== 'undefined' ? options.addBoard : true
    options.addPoints = typeof options.addPoints !== 'undefined' ? options.addPoints : true
    
    if(options.showMySnake) console.log('---------- ', gameState.you.name, ' | TURN: ', gameState.turn, ' | HEALTH: ', gameState.you.health, ' | LENGTH: ', gameState.you.body.length, ' ---------')
    
    gameState.parsedBoardPoints = parseBoardPoints(gameState)

    gameState.boardArray = createBoardMap(gameState.parsedBoardPoints, gameState.board.height, gameState.board.width)
      
    if(options.showBoard) console.dir(gameState.boardArray)

    if(!options.addBoard) delete gameState.boardArray
    
    if(!options.addPoints) delete gameState.parseBoardPoints
    
    return gameState

  } catch (err) {
    console.error('boardState.visualize - top level error: ', err)
  }
}