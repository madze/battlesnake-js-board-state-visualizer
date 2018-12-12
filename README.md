# battlesnake-board-state-visualizer
A simple module for battlesnake.io, node.js snakes - For parsing points arrays and printing the current board state to the console

## Init
```html
var gameState = boardState.visualize(req.body,[options])
```
## Options
Option | Default | Description
--- | --- | ---
`showMySnake` | `true` | Prints info about your snake to the logs
`showBoard` | `true` | Prints the visualized board array to the logs
`addBoard` | `false` | Attaches board array to game state object: `gameState.boardArray`
`addPoints` | `true` | Attaches parsed points to current game state object: `gameState.parsedBoardPoints` (these will contain additional properties with information about the current state of that point)

## Reading Printed Board Array
Example board array:
```html
[ [ 0, 1, 0, 4, 0 ],
  [ 0, 5, 0, 0, 3 ],
  [ 0, 5, 0, 5, 5 ],
  [ 0, 5, 0, 5, 0 ],
  [ 0, 0, 0, 5, 0 ] ]
```
* 1's = Your snakes head
* 2's = Other snake heads you can eat
* 3's = Other snake heads you cannot eat
* 4's = Food
* 5's = Snake body segments
