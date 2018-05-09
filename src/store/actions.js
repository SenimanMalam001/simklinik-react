import {
  SET_TOKEN,
  SET_USERS,
  ERROR,
  LOADING,
  LOADING_FINISH,
  SEARCH_USERS,
  SET_PAGES
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

export const loading  = { type: LOADING }
export const loadingFinish  = { type: LOADING_FINISH }
export const error  = { type: ERROR }
