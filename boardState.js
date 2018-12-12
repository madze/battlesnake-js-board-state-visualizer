const boardState = module.exports

boardState.parseFood = (board) => {
  try {
    if(!board.food) return []
    return board.food.map((f) => {
      let formattedFood = {
        x:f.x,
        y:f.y
      }
      formattedFood.type = 'food'
      formattedFood.meal = true
      return formattedFood
    })
  } catch (err) {
    console.error('boardState parseFood - error parsing food data: ', err)
  }
}

boardState.parseSnakes = (gameState) => {
  try {
    const snakes = []
    gameState.board.snakes.forEach((snake) => {
      let isYou = snake.id === gameState.you.id
      
      snake.body.forEach((segment, i) => {
        let formattedSegment = {
          x:segment.x,
          y:segment.y
        }
        if(isYou) {
          formattedSegment.type = 'you'
        } else {
          formattedSegment.type = 'snake'
        }
        formattedSegment.isCollision = true
        if(i === 0) {
          formattedSegment.part = 'head'
          if(!isYou && snake.body.length < gameState.you.body.length) {
            formattedSegment.meal = true
            formattedSegment.isCollision = false
          } 
        }
        if(i + 1 === snake.body.length) {
          formattedSegment.part = 'tail'
        }
        if(isYou) {
          if(formattedSegment.part === 'head') formattedSegment.isCollision = false
          if(i === 1) {
            formattedSegment.part = 'neck'
          } else if(i + 1 === snake.body.length) {
            formattedSegment.isCollision = false
          }
        }
        snakes.push(formattedSegment)
      })
    })
    return snakes
  } catch (err) {
    console.error('boardState parseSnakes - error parsing snake data: ', err)
  }
}
boardState.parseBoardPoints = (gameState) => {
  try {
    return boardState.parseFood(gameState.board)
    .concat(boardState.parseSnakes(gameState))
  } catch (err) {
    console.error('boardState parseBoardPoints - error parsing points array data: ', err)
  }
}

boardState.createBoardMap = (pointsArry, boardHeight, boardWidth) => {
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
    options.addBoard = typeof options.addBoard !== 'undefined' ? options.addBoard : false
    options.addPoints = typeof options.addPoints !== 'undefined' ? options.addPoints : true
    
    if(options.showMySnake) console.log('---------- ', gameState.you.name, ' | TURN: ', gameState.turn, ' | HEALTH: ', gameState.you.health, ' | LENGTH: ', gameState.you.body.length, ' ---------')
    
    gameState.parsedBoardPoints = boardState.parseBoardPoints(gameState)

    gameState.boardArray = boardState.createBoardMap(gameState.parsedBoardPoints, gameState.board.height, gameState.board.width)
      
    if(options.showBoard) console.dir(gameState.boardArray)

    if(!options.addBoard) delete gameState.boardArray

    if(!options.addPoints) delete gameState.parsedBoardPoints
    
    return gameState

  } catch (err) {
    console.error('boardState.visualize - top level error: ', err)
  }
}