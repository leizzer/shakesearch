import React, {useReducer} from 'react'
import logo from './logo.svg'
import './App.css'

import StoreContext, {reducer, initialState, setQuery, startFetch, endFetch, fetchSuccess} from './store'

import SearchBar from './components/search-bar'
import QuotesList from './components/quotes'
import Title from './components/title'
import TextBlock from './components/text-block'
import Loading from './components/loading'

// Axios
import axios from 'axios'

const searchQuery = (text, callback, errCallback) => axios({
    baseURL: process.env.REACT_APP_API,
    url:`search?q=${text}`
  })
  .then((response) => callback(response.data.Data || []))
  .catch((error) => {
    errCallback()
    console.log('ERROR: ', error)
  })

const App = () => {

  const [store, dispatch] = useReducer(reducer, initialState)

  const submitQuery = (text) => {
    dispatch(startFetch())
    dispatch(setQuery(text))

    searchQuery(
      text,
      (response) => dispatch(fetchSuccess(response)),
      () => dispatch(endFetch())
    )
  }

  return (
    <div className="App">
      <Title>
        Shake Search
      </Title>

      <TextBlock>
        Look for snippets containing
        <br/>
        <span className="highlighted">a key word</span> in the complete works of
        <br/>
        William Shakespeare
      </TextBlock>

      <StoreContext.Provider value={{store, dispatch}}>
        <SearchBar onSubmit={submitQuery}/>
        {
          store.fetching ? <Loading/> : <QuotesList />
        }
      </StoreContext.Provider>
    </div>
  )
}

export default App
