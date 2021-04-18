import axios from 'axios'

const GET_DUCKS = 'GET_DUCKS'
const GET_SELECTED_DUCK = 'GET_SELECTED_DUCK'
const ADD_DUCK = 'ADD_DUCK'
const EDIT_DUCK = 'EDIT_DUCK'
const REMOVE_DUCK = 'REMOVE_DUCK'

const defaultDucks = []

export const getDucks = (ducks) => ({
  type: GET_DUCKS,
  ducks
})

export const getSingleDuck = (duck) => ({
  type: GET_SELECTED_DUCK,
  duck
})

export const addDuck = (duckName, duckColor, userId) => ({
  type: ADD_DUCK,
  duckName,
  duckColor,
  userId
})

export const changeDuck = (duckName, duckColor, duckId) => ({
  type: EDIT_DUCK,
  duckName,
  duckColor,
  duckId
})

export const removeDuck = (duckId) => ({
  type: REMOVE_DUCK,
  duckId
})

export const fetchDucks = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/ducks/${userId}`)
    dispatch(getDucks(data))
  } catch (err) {
    console.error('Error fetching ducks: ', err)
  }
}

export const fetchSingleDuck = (duckId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`api/ducks/oneDuck/${duckId}`)
    dispatch(getSingleDuck(data))
  } catch (err) {
    console.error('Error fetching single duck')
  }
}



export const createDuck = (duckName, duckColor, userId) => async (dispatch) => {
  try {
    const data = await axios.post('/api/ducks', {
      name: duckName,
      color: duckColor,
      userId,
    })
  } catch (err) {
    console.error('Error adding duck', err)
  }
}

export const editDuck = ( duckName, duckColor, duckId) => async (dispatch) => {
  try {
    const update = await axios.patch(`/api/ducks/oneDuck/${duckId}`, {
      duckName,
      duckColor,
    })
    dispatch(changeDuck(duckColor, duckName, duckId))
  } catch (err) {
    console.error('Error changing duck', err)
  }
}

export const deleteDuck = (duckId) => async (dispatch) => {
  try {
    await axios.delete(`/api/ducks/oneDuck/${duckId}`)
    dispatch(removeDuck(duckId))
  } catch (err) {
    console.error('Error deleting duck from nest', err)
  }
}

export default function (state = defaultDucks, action) {
  switch (action.type) {
    case GET_DUCKS:
      return action.ducks
    case GET_SELECTED_DUCK:
      return action.duck
    case ADD_DUCK:
      return [...state, action.duckName]
    case EDIT_DUCK:
      return [
        state.map((duck) => {
          if (duck.id === action.duckId) {
            return {
              ...duck,
              name: action.duckName,
              color: action.duckColor
            }
          } else {
            return duck
          }
        }),
      ]
    case REMOVE_DUCK:
      return [
        ...state.filter((duck) => {
          if (duck.id !== action.duckId) {
            return duck
          }
        })
      ]
    default:
      return state
  }
}
