import * as actionTypes from '../actions/actionTypes'
import updateObject from '../../utils/updateObject'
import * as constants from '../../utils/constants'

// TODO: Move all logic from reducers to actions
// Reducers should only be pure functions

const initialState = {
  gameState: constants.GAME_NULL,
  mRows: null,
  nCols: null,
  grid: null,
  foodCell: null,
  snake: null,
  direction: constants.UP,
  freezeSnake: null,
  snakeSpeed: 500,
  score: 0,
  highScore: 0,
  scoreAdder: 5
}

const gameReady = (state, action) => {
  return updateObject(state, {
    gameState: constants.GAME_READY,
    mRows: action.mRows || state.mRows,
    nCols: action.nCols || state.nCols,
    grid: action.grid || state.grid,
    foodCell: action.foodCell,
    snake: action.snake,
    snakeSpeed: 500,
    score: 0,
    highScore: action.highScore
  })
}

const gamePlaying = (state, action) => {
  return updateObject(state, {
    gameState: constants.GAME_PLAYING,
    freezeSnake: action.freezeSnake
  })
}

const gamePaused = (state, action) => {
  return updateObject(state, {
    gameState: constants.GAME_PAUSED,
    freezeSnake: null
  })
}

const gameOver = (state, action) => {
  return updateObject(state, {
    gameState: constants.GAME_OVER,
    freezeSnake: null
  })
}

const moveSnake = (state, action) => {
  let toUpdateProperties = {
    snake: action.snake
  }
  if (action.foodCell) {
    toUpdateProperties.foodCell = action.foodCell
  }
  return updateObject(state, toUpdateProperties)
}

const changeSnakeDirection = (state, action) => {
  return updateObject(state, {
    direction: action.direction
  })
}

const eatFood = (state, action) => {
  // Eating a food requires to generate a new food cell and update score
  return updateObject(state, {
    foodCell: action.foodCell,
    score: state.score + state.scoreAdder
  })
}

const levelUp = (state, action) => {
  return updateObject(state, {
    snakeSpeed: action.snakeSpeed,
    scoreAdder: action.scoreAdder,
    freezeSnake: action.freezeSnake
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.GAME_READY: return gameReady(state, action)
    case actionTypes.GAME_PLAYING: return gamePlaying(state, action)
    case actionTypes.GAME_PAUSED: return gamePaused(state, action)
    case actionTypes.GAME_OVER: return gameOver(state, action)
    case actionTypes.MOVE_SNAKE: return moveSnake(state, action)
    case actionTypes.CHANGE_SNAKE_DIRECTION: return changeSnakeDirection(state, action)
    case actionTypes.EAT_FOOD: return eatFood(state, action)
    case actionTypes.LEVEL_UP: return levelUp(state, action)
    default: return state
  }
}

export default reducer