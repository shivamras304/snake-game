import * as actionTypes from './actionTypes'
import firebase from '../../utils/initFirebase'
import { getFoodCell, getInitialSnake } from '../../game/gameSetup';

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
  return {
    type: actionTypes.GAME_PLAYING,
    ...payload
  }
}

export const gamePaused = (payload) => {
  return {
    type: actionTypes.GAME_PAUSED,
    ...payload
  }
}

export const gameOver = () => {
  document.getElementById('gameOverSound').play()
  return {
    type: actionTypes.GAME_OVER
  }
}

export const updateHighScore = (userUid, highScore) => {
  console.log(userUid, highScore)
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

export const levelUp = () => {
  return {
    type: actionTypes.LEVEL_UP
  }
}