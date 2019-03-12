import * as actionTypes from './actionTypes'
import firebase from '../../utils/initFirebase'

export const authSignIn = (user) => {
  return dispatch => {
      firebase.firestore().collection('users').doc(user.uid)
      .set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        providerId: user.providerId
      }, {
        merge: true
      })
      .then(() => dispatch(authSuccessful(user)))
      .catch((error) => {
        console.log(error)
        dispatch(authFailed())
      })
  }
}

export const authSuccessful = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESSFUL,
    user: user
  }
}

export const authFailed = () => {
  return {
    type: actionTypes.AUTH_FAILED
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const logout = () => {
  return dispatch => {
    
  }
}