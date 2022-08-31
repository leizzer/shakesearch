import React, {useReducer} from 'react'
import logo from './logo.svg'
import './App.css'

import StoreContext, {reducer, initialState, fetchSuccess} from './store/index'

import SearchBar from './components/search-bar'
import QuotesList from './components/quotes'
import Title from './components/title'
import SubTitle from './components/sub-title'

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
      <Title>
        Shake Search
      </Title>

      <SubTitle>
        Look for snippets containing
        <br/>
        key words in the complete works of
        <br/>
        William Shakespeare
      </SubTitle>

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
