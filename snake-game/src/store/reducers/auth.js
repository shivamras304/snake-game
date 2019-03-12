import * as actionTypes from '../actions/actionTypes'
import updateObject from '../../utils/updateObject'
import { NULL_USER } from '../../utils/constants'

const initialState = {
  isSignedIn: false,
  user: NULL_USER
  // user has the following keys
  // { uid, name, email, photoURL, providerId }
}

const authSuccessful = (state, action) => {
  return updateObject(state, {
    isSignedIn: true,
    user: action.user
  })
}

const authFailed = (state, action) => {
  return updateObject(state, {
    isSignedIn: false,
    user: null
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    isSignedIn: false,
    user: NULL_USER
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_SUCCESSFUL: return authSuccessful(state, action)
    case actionTypes.AUTH_FAILED: return authFailed(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    default: return state
  }
}

export default reducer