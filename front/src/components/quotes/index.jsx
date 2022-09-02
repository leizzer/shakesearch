import React, {useContext, useState, useEffect} from 'react'
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

const Collapsable = styled.div`
  color: #fbd88d;
  text-align: left;
  font-size: 1.5rem;
  text-indent: 2rem;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.selected ? '#1c5772' : '#324d5b' };
  transition: background-color 400ms linear;
`
const CollapsableContent = styled.div`
  margin-top: 1rem;
  display: ${(props) => props.show ? 'block' : 'none'};
`

const List = () => {
  const {store: {quotes, query}} = useContext(StoreContext)
  const [selected, setSelected] = useState()

  const isSelected = (index) => index === selected

  const toggleSelect = (index) => {
    let i =  index === selected ? null : index
    setSelected(i)
  }

  const processText = (text) => {
    const regex = new RegExp(`(?:\r\n|\r|\n|${query})`, 'gi')
    return sanitize(text).replace(
      regex,
      (match) => match.toUpperCase() === query.toUpperCase() ? `<span class="highlighted">${match}</span>` : '<br/>'
    )
  }

  useEffect(() => {
    selected && document.getElementById(selected).scrollIntoView()
  }, [selected])

  const list = quotes.map((quote, i) => (
    <Collapsable key={i} id={i} selected={isSelected(i)} onClick={() => toggleSelect(i)}>
      {quote.Work} <span className="highlighted">({quote.Snippets.length})</span>

      <CollapsableContent show={isSelected(i)}>
        {isSelected(i) && quote.Snippets.map((snippet, j) => (
          <Quote key={`${i}-${j}`}>
            <Snippet  dangerouslySetInnerHTML={{__html: processText(snippet)}} />
          </Quote>
        ))}
      </CollapsableContent>
    </Collapsable>
  ))

  return (
    <Quotes> {list} </Quotes>
  )
}

export default List
