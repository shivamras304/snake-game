import * as actionTypes from './actionTypes'
import firebase from '../../utils/initFirebase'

export const lbOpen = () => {
  return {
    type: actionTypes.LB_OPEN
  }
}

export const lbClose = () => {
  return {
    type: actionTypes.LB_CLOSE
  }
}

export const lbLoaded = (data) => {
  return {
    type: actionTypes.LB_OPEN,
    data: data
  }
}

export const lbLoad = () => {
  return dispatch => {
    firebase.firestore().collection('users')
      .orderBy('highScore', 'desc')
      .limit(5)
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }
}