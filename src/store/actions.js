import {
  SET_TOKEN,
  SET_USERS,
  ERROR,
  LOADING,
  LOADING_FINISH
} from './actionTypes'
import axios from '../axios'

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token
  }
}

export const setUsers = () => {
  return dispatch => {
    const token = localStorage.token
    axios.get('/users',{ headers: { token, otoritas: 'get_user' }}).then((res) => {
      const { data } = res.data
      dispatch({
        type: SET_USERS,
        payload: data
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}



export const loading  = { type: LOADING }
export const loadingFinish  = { type: LOADING_FINISH }
export const error  = { type: ERROR }
