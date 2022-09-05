import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import StoreContext from '../../store'
import ShakeItExp from '../shake-it'
import TextBlock from '../text-block'
import Accordion from './accordion'

const Quotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justification-content: center;
  width: 80%;

  @media (max-width: 768px) {
    width: 90%;
  }
`

const Work = styled.p`
  color: #a0d1e7;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 1rem;
`

const List = () => {
  const {store: {quotes, found, query}} = useContext(StoreContext)

  return (
    <Quotes>
      {
        quotes.length > 0 ?
          <Accordion quotes={quotes} query={query}/>
          : found === 0 ?
            <TextBlock>... nothing.<br /> Try another word</TextBlock>
            : <ShakeItExp/>
      }
    </Quotes>
  )
}

export default List
