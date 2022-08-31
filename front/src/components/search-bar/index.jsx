import React, {useState, useContext} from 'react'
import StoreContext, {fetchSuccess} from '../../store'

const SearchBar = ({onSubmit}) => {
  const [value, setValue] = useState('')
  const {dispatch} = useContext(StoreContext)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(value)
  }

  return <div>
    <form id="form" onSubmit={handleSubmit}>
      <label htmlFor="query">Query</label>
      <input type="text" id="query" name="query" value={value} onChange={handleChange}/>
      <button type="submit">Search</button>
    </form>
  </div>
}

export default SearchBar
