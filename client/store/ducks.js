import axios from 'axios'

const GET_DUCKS = 'GET_USER'
const SET_DUCKS = 'SET_DUCKS'
const REMOVE_DUCK = 'REMOVE_DUCK'
const EDIT_DUCK = 'EDIT_DUCK'
const ADD_DUCK = 'ADD_DUCK'


const defaultDucks = []

export const setDucks = ducks => ({
  type: SET_DUCKS,
  ducks
})

export const removeDuck = duckId => ({
  type: REMOVE_DUCK,
  duckId
})

export const addDuck = (duckColor, duckName, userId )=> ({
  type: ADD_DUCK,
  duckColor, duckName, userId
})

export const changeDuck = (duckName, duckColor, duckId) => ({
  type: EDIT_DUCK,
  duckName,
  duckColor,
  duckId
})

export const fetchDucks = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/ducks/${userId}`)
    dispatch(setDucks(data))
  } catch (err) {
    console.error('Error fetching ducks: ', err)
  }
}

export const deleteDuck = duckId => async dispatch => {
  try {
    await axios.delete(`/api/ducks/${duckId}`)
    dispatch(removeDuck(duckId))
  } catch (err) {
    console.error('Error deleting duck from nest', err)
  }
}

export const createDuck = (duckColor, duckName, userId) => async dispatch => {
  try {
    console.log('hello')
    const data = await axios.post('/api/ducks', {
      name: duckName,
      color: duckColor,
      userId
    })
    // dispatch(addDuck(duckColor, duckName, userId))
  } catch (err) {
    console.error('Error adding duck', err)
  }
}

export const editDuck = (duckName, duckColor, duckId) => async dispatch => {
  try {
    const update = await axios.patch(`/api/cart/${duckId}`, {
      duckName,
      duckColor
    })
    dispatch(changeDuck(duckName, duckColor, duckId))
  } catch (err) {
    console.error('Error changing duck', err)
  }
}

export default function(state = defaultDucks, action) {
  switch (action.type) {
    case GET_DUCKS:
      return action.ducks
    case ADD_DUCK:
      return [...state, action.duckName]
    case EDIT_DUCK:
      return [
        state.map(duck => {
          if (duck.duckId === action.duckId) {
            return {
              ...duck,
              duckName: action.duckName,
              duckColor: action.duckColor
            }
          } else {
            return duck
          }
        })
      ]
    case REMOVE_DUCK:
      return [
        ...state.filter(duck => {
          if (duck.id !== action.duckId) {
            return duck
          }
        })
      ]
    default:
      return state
  }
}
