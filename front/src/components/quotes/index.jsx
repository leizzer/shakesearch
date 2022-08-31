import React, {useContext} from 'react'
import styled from 'styled-components'
import StoreContext from '../../store'
import sanitize from 'sanitize-html'

const Quotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justification-content: center;
`

const Quote = styled.div`
  text-align: left;
  flex-basis: 100%;
`

const Snippet = styled.p`
  background-color: #324d5b;
  color: #fbd88d;
  margin: 2rem;
  padding: 3rem;
`

//.replace(/(?:\r\n|\r|\n)/g, '<br>')
const List = () => {
  const {store} = useContext(StoreContext)

  const quotes = store.quotes.map((text, index) => (
    <Quote key={index}>
      <Snippet  dangerouslySetInnerHTML={{__html: sanitize(text).replace(/(?:\r\n|\r|\n)/g, '<br>')}} />
    </Quote>
  ))

  return (
    <Quotes> {quotes} </Quotes>
  )
}

export default List
