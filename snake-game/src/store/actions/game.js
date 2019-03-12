import * as actionTypes from './actionTypes'
import firebase from '../../utils/initFirebase'
import { getFoodCell, getInitialSnake } from '../../game/gameSetup';
import moveSnakeHelper from '../../game/moveSnake'

export const gameReady = (payload) => {

  if (!payload.foodCell) {
    payload.foodCell = getFoodCell()
  }

  if(!payload.snake) {
    payload.snake = getInitialSnake()
  }

  return {
    type: actionTypes.GAME_READY,
    ...payload
  }
}

export const setGameReady = (userUid, payload) => {
  return dispatch => {
    // Fetch highScore if available
    firebase.firestore().collection('users').doc(userUid)
      .get()
      .then(doc => {
        dispatch(gameReady({
          ...payload,
          highScore: doc.data().highScore || 0
        }))
      })
      .catch(error => {
        console.log(error)
        dispatch(gameReady(payload))
      })
  }
}

export const gamePlaying = (payload) => {

  payload.freezeSnake = setInterval(() => {
    moveSnakeHelper()
  }, payload.snakeSpeed)

  return {
    type: actionTypes.GAME_PLAYING,
    ...payload
  }
}

export const gamePaused = (payload) => {

  clearInterval(payload.freezeSnake)

  return {
    type: actionTypes.GAME_PAUSED
  }
}

export const gameOver = (payload) => {

  clearInterval(payload.freezeSnake)
  document.getElementById('gameOverSound').play()

  return {
    type: actionTypes.GAME_OVER
  }
}

export const updateHighScore = (userUid, highScore) => {
  return dispatch => {
    firebase.firestore().collection('users').doc(userUid)
    .set({
      highScore
    }, {
      merge: true
    })
    .then(() => dispatch(gameReady({
      highScore
    })))
    .catch(error => {
      console.log(error)
      // dispatch()
    })
  }
}

export const moveSnake = (snake) => {
  return {
    type: actionTypes.MOVE_SNAKE,
    snake: snake
  }
}

export const changeSnakeDirection = (direction) => {
  return {
    type: actionTypes.CHANGE_SNAKE_DIRECTION,
    direction: direction
  }
}

export const eatFood = (foodCell) => {
  document.getElementById('eatSound').play()
  return {
    type: actionTypes.EAT_FOOD,
    foodCell: foodCell
  }
}

export const levelUp = (payload) => {
  // Defining the logic for levelling up

  // Decrease the timesInMillis (Increasing speed) by 50 points
  payload.snakeSpeed = payload.snakeSpeed > 150 ? payload.snakeSpeed - 50 : payload.snakeSpeed

  // Increase the adder for score
  payload.scoreAdder = payload.scoreAdder + 5

  clearInterval(payload.freezeSnake)

  payload.freezeSnake = setInterval(() => {
    moveSnakeHelper()
  }, payload.snakeSpeed)

  return {
    type: actionTypes.LEVEL_UP,
    ...payload
  }
}