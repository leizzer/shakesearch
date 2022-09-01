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
  background-color: #324d5b;
  text-align: left;
  flex-basis: 100%;
  margin: 2rem;
  padding: 2rem 2rem 0.5rem 2rem;
`

const Snippet = styled.p`
  color: #fbd88d;
`

const Work = styled.p`
  color: #a0d1e7;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 1rem;
`

const List = () => {
  const {store} = useContext(StoreContext)

  const quotes = store.quotes.map((quote, index) => (
    quote.Snippets.map((snippet) => (
      <Quote key={index}>
        <Snippet  dangerouslySetInnerHTML={{__html: sanitize(snippet).replace(/(?:\r\n|\r|\n)/g, '<br>')}} />
        <Work>{quote.Work}</Work>
      </Quote>
    ))
  ))

  return (
    <Quotes> {quotes} </Quotes>
  )
}

export default List
