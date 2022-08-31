import React, {createContext} from 'react'

const FETCH_SUCCESS = 'fetchSuccess'
const RESET = 'reset'

const StoreContext = createContext()

export const initialState = {quotes: []}

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {...state, quotes: action.payload}
    case RESET:
      return initialState
    default:
      throw new Error()
  }
}

export const fetchSuccess = (response) => (
  { type: FETCH_SUCCESS, payload: response }
)

export default StoreContext
