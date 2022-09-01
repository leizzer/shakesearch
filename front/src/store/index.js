import React, {createContext} from 'react'

const FETCH_SUCCESS = 'fetchSuccess'
const START_FETCH = 'startFetch'
const END_FETCH = 'endFetch'
const RESET = 'reset'
const SET_QUERY = 'setQuery'

const StoreContext = createContext()

export const initialState = {
  query: null,
  fetching: false,
  quotes: []
}

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {...state, query: action.payload}
    case START_FETCH:
      return {...state, fetching: true}
    case END_FETCH:
      return {...state, fetching: false}
    case FETCH_SUCCESS:
      return {...state, fetching: false, quotes: action.payload}
    case RESET:
      return initialState
    default:
      throw new Error()
  }
}

export const setQuery = (query) => (
  { type: SET_QUERY, payload: query }
)

export const fetchSuccess = (response) => (
  { type: FETCH_SUCCESS, payload: response }
)

export const startFetch = () => (
  { type: START_FETCH }
)

export const endFetch = () => (
  { type: END_FETCH }
)

export default StoreContext
