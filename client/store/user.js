import axios from 'axios'
import history from '../history'

//action types

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

//default state

const defaultUser = {}


//action creators

const getUser = (user) => ({
  type: GET_USER,
  user
 })

const removeUser = () => ({
  type: REMOVE_USER
})

//thunks

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (userName, password, method) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { userName, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/nest')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
