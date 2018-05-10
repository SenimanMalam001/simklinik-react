import {
  SET_TOKEN,
  SET_PRODUK,
  SET_KOMISI,
  SET_PENJAMIN,
  SET_SUPPLIER,
  SET_PAGES,
  SET_USERS,
  SET_KAS,
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
  kas: [],
  komisi: [],
  penjamin: [],
  produk: [],
  supplier: [],
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

  if(action.type === SET_KOMISI) {
    return {
      ...state,
      komisi: action.payload
    }
  }
  if(action.type === SET_PRODUK) {
    return {
      ...state,
      produk: action.payload
    }
  }

  if(action.type === SET_USERS) {
    return {
      ...state,
      users: action.payload
    }
  }

  if(action.type === SET_SUPPLIER) {
    return {
      ...state,
      supplier: action.payload
    }
  }
  if(action.type === SET_PENJAMIN) {
    return {
      ...state,
      penjamin: action.payload
    }
  }
  if(action.type === SET_KAS) {
    return {
      ...state,
      kas: action.payload
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
