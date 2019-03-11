import * as actionTypes from './actionTypes'
import firebase from '../../utils/initFirebase'

export const gameReady = (payload) => {
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
        console.log(doc.data())
        console.log(payload)
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