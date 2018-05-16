import {
  SET_TOKEN,
  SET_PRODUK,
  SET_STOK_AWAL,
  SET_STOK_OPNAME,
  SET_REGISTRASI,
  SET_ITEM_MASUK,
  SET_ITEM_KELUAR,
  SET_PASIEN_REGISTRASI,
  SET_KOMISI,
  SET_PASIEN,
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
  item_masuks: [],
  item_keluars: [],
  stok_awals: [],
  stok_opnames: [],
  pasien: [],
  pasien_registrasi: '',
  penjamin: [],
  registrasi: [],
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

  if(action.type === SET_PASIEN_REGISTRASI) {
    return {
      ...state,
      pasien_registrasi: action.payload
    }
  }

  if(action.type === SET_REGISTRASI) {
    return {
      ...state,
      registrasi: action.payload
    }
  }

  if(action.type === SET_STOK_AWAL) {
    return {
      ...state,
      stok_awals: action.payload
    }
  }

  if(action.type === SET_STOK_OPNAME) {
    return {
      ...state,
      stok_opnames: action.payload
    }
  }

  if(action.type === SET_ITEM_MASUK) {
    return {
      ...state,
      item_masuks: action.payload
    }
  }

  if(action.type === SET_ITEM_KELUAR) {
    return {
      ...state,
      item_keluars: action.payload
    }
  }

  if(action.type === SET_PASIEN) {
    return {
      ...state,
      pasien: action.payload
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
