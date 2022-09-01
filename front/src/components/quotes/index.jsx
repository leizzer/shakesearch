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
  const {store: {quotes, query}} = useContext(StoreContext)

  const prepareSnippet = (text) => {
    const regex = new RegExp(`(?:\r\n|\r|\n|${query})`, 'g')
    return sanitize(text).replace(
      regex,
      (match) => match == query ? `<span class="highlighted">${query}</span>` : '<br/>'
    )
  }

  const list = quotes.map((quote, i) => (
    quote.Snippets.map((snippet, j) => (
      <Quote key={`${i}-${j}`}>
        <Snippet  dangerouslySetInnerHTML={{__html: prepareSnippet(snippet)}} />
        <Work>{quote.Work}</Work>
      </Quote>
    ))
  ))

  return (
    <Quotes> {list} </Quotes>
  )
}

export default List
