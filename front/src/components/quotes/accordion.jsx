import React, {useEffect, useState}  from 'react'
import styled from 'styled-components'
import sanitize from 'sanitize-html'

const Collapsable = styled.div`
  cursor: pointer;
  color: #fbd88d;
  text-align: left;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.selected ? '#1c5772' : '#324d5b' };
  transition: background-color 400ms linear;
  padding: 15px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`
const CollapsableContent = styled.div`
  margin-top: 1rem;
  display: ${(props) => props.show ? 'block' : 'none'};
`

const Quote = styled.div`
  background-color: #324d5b;
  text-align: left;
  flex-basis: 100%;
  margin: 2rem;
  padding: 2rem 2rem 0.5rem 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 5px 0px;
    padding: 10px;
  }
`

const Snippet = styled.p`
  color: #fbd88d;
`

const Accordion = ({quotes, query}) => {
  const isSelected = (index) => index === selected
  const [selected, setSelected] = useState()

  useEffect(() => {
    selected && document.getElementById(selected).scrollIntoView()
  }, [selected])

  const toggleSelect = (index) => {
    let i =  index === selected ? null : index
    setSelected(i)
  }

  const processText = (text) => {
    const regex = new RegExp(`(?:\r\n|\r|\n|${query})`, 'gi')
    return sanitize(text).replace(
      regex,
      (match) => (
        match.toUpperCase() === query.toUpperCase() ?
        `<span class="highlighted">${match}</span>`
        : '<br/>'
      )
    )
  }

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

  return list
}

export default Accordion
