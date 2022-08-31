import React, {useReducer} from 'react'
import logo from './logo.svg'
import './App.css'

import StoreContext, {reducer, initialState, fetchSuccess} from './store/index'

import SearchBar from './components/search-bar'
import QuotesList from './components/quotes'

// Axios
import axios from 'axios'

const URL = 'http://localhost:3001'

const searchQuery = (text, callback) => axios.get(`${URL}/search?q=${text}`)
  .then((response) => callback(response.data))
  .catch((error) => console.log('ERROR: ', error))
///////////////////////////////////////////////////////////////////////

const App = () => {

  const [store, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <div className="App-header">
        Shakespeare Search
      </div>

      <StoreContext.Provider value={{store, dispatch}}>
        <SearchBar onSubmit={(text) => searchQuery(
          text,
          (response) => dispatch(fetchSuccess(response))
        )}/>
        <QuotesList />
      </StoreContext.Provider>
    </div>
  )
}

export default App
