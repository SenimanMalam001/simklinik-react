import {
  SET_TOKEN,
  SET_PAGES,
  SET_USERS,
  LOADING,
  LOADING_FINISH,
  ERROR
} from './actionTypes'

const initialState = {
  token: '',
  users: [],
  loading: false,
  error: false,
  pages: 0
}
const reducer = (state = initialState, action) => {
  if(action.type === SET_TOKEN) {
    return {
      ...state,
      token: action.payload
    }
  }

  if(action.type === SET_PAGES) {
    return {
      ...state,
      pages: action.payload
    }
  }

  if(action.type === SET_USERS) {
    return {
      ...state,
      users: action.payload
    }
  }

  if(action.type === ERROR) {
    return {...state, error: true }
  }

  if(action.type === LOADING) {
    return {...state, loading: true }
  }

  if(action.type === LOADING_FINISH) {
    return {...state, loading: false }
  }

  return state
}

export default reducer
