import {
  SET_TOKEN,
  SET_PAGES,
  SET_USERS,
  SET_RUANGANS,
  SET_POLI,
  LOADING,
  LOADING_FINISH,
  ERROR,
  SET_KATEGORI_TRANSAKSI
} from './actionTypes'

const initialState = {
  token: '',
  users: [],
  poli: [],
  ruangan: [],
  kategori_transaksi: [],
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

  if(action.type === SET_RUANGANS) {
    return {
      ...state,
      ruangan: action.payload
    }
  }

  if(action.type === SET_POLI) {
    return {
      ...state,
      poli: action.payload
    }
  }

  if(action.type === SET_KATEGORI_TRANSAKSI) {
    return {
      ...state,
      kategori_transaksi: action.payload
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
