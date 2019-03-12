import * as actionTypes from '../actions/actionTypes'
import updateObject from '../../utils/updateObject'

const initialState = {
  data: null,
  isOpen: false
}

const lbOpen = (state, action) => {
  return updateObject(state, {
    isOpen: true
  })
}

const lbLoaded = (state, action) => {
  return updateObject(state, {
    data: action.data
  })
}

const lbClose = (state, action) => {
  return updateObject(state, {
    isOpen: false,
    data: null
  })
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.LB_OPEN: return lbOpen(state, action)
    case actionTypes.LB_LOADED: return lbLoaded(state, action)
    case actionTypes.LB_CLOSE: return lbClose(state, action)
    default: return state
  }
}

export default reducer