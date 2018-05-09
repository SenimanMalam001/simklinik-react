import {
  SET_TOKEN,
  SET_USERS,
  SET_KAS,
  SET_PENJAMIN,
  SET_RUANGANS,
  ERROR,
  LOADING,
  LOADING_FINISH,
  SEARCH_USERS,
  SET_PAGES,
  SET_KATEGORI_TRANSAKSI,
  SET_POLI
} from './actionTypes'
import axios from '../axios'

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token
  }
}

export const setUsers = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/users?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_user' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_USERS,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setPenjamin = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/penjamin?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_penjamin' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_PENJAMIN,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}
export const setKas = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/kas?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_kas' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_KAS,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setRuangans = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/ruangan?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_ruangan' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_RUANGANS,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const setPoli = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/poli?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_poli' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_POLI,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}
export const setKategoriTransaksi = (page, query) => {
  if (!page) {
    page = 1
  }

  if (!query) {
    query = ''
  }
  return dispatch => {
    const token = localStorage.token
    dispatch(loading)
    axios.get(`/kategori-transaksi?page=${page}&q=${query}`,{ headers: { token, otoritas: 'get_kategori_transaksi' }}).then((res) => {
      const { data, pages } = res.data.data
      dispatch({
        type: SET_KATEGORI_TRANSAKSI,
        payload: data
      })
      dispatch({
        type: SET_PAGES,
        payload: pages
      })
      dispatch(loadingFinish)
    }).catch((err) => {
      dispatch(loadingFinish)
      console.log(err)
    })
  }
}

export const loading  = { type: LOADING }
export const loadingFinish  = { type: LOADING_FINISH }
export const error  = { type: ERROR }
