import React, {useContext} from 'react'
import StoreContext from '../../store'

const List = () => {
  const {store} = useContext(StoreContext)

  const quotes = store.quotes.map((text, index) => (
    <tr key={index}>
      <td>{text}</td>
    </tr>
  ))

  return (
    <table id="table">
      <tbody id="table-body">
        {quotes}
      </tbody>
    </table>
  )
}

export default List
