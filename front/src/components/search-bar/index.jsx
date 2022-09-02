import React, {useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import ShakeDetector from 'shake-detector';

const Form = styled.form`
  display: flex;
  align-items: stretch;
  padding: 2rem 2rem;
  with: 100%;
  justify-content: center;
  align-content: space-between;
`

const TextInput = styled.input.attrs({
  type: 'text'
})`
  align-self: auto;
  flex-basis: 80%;
  line-height: 4rem;
  text-align: center;
  color: #452f02;
  background-color: #85a8bb;
  border: none;
  border-radius: 10px 0 0;
`

const SubmitButton = styled.button.attrs({
  type: 'submit'
})`
  align-self: auto;
  flex-basis: 20%;
  font-size: 1.3rem;
  color: #452f02;
  background-color: #85a8bb;
  border: none;
  border-left: 2px solid #b3c8d5;
  border-radius: 0 10px 0 0;
`

const SearchBar = ({onSubmit}) => {
  const [value, setValue] = useState()

  const onShake = () => {
    if (value) {
      onSubmit(value)
      return
    }

    const samples = [
      "love",
      "Macbeth",
      "Romeo",
      "Othello"
    ]

    const index = Math.floor(Math.random()*samples.length)
    const sample = samples[index]
    setValue(sample)
    onSubmit(sample)
  }

  useEffect(() => {
    const shakeDetector = new ShakeDetector()
    const requestTrigger = document.getElementById('requestTrigger');

    shakeDetector.requestPermission(requestTrigger).then(() => {
      shakeDetector.start();
    });

    window.addEventListener(ShakeDetector.SHAKE_EVENT, onShake);
    return () => window.removeEventListener(ShakeDetector.SHAKE_EVENT, onShake);
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value.trim())
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(value)
  }

  return (
    <Form id="form" onSubmit={handleSubmit}>
      <TextInput autoFocus id="query" name="query" placeholder={"Love"} value={value} onChange={handleChange}/>
      <SubmitButton>Search</SubmitButton>
    </Form>
  )
}

export default SearchBar
