import React, { useState } from 'react'
import styled from '@emotion/styled'

import Layout from '@components/Layout'
import SEO from '@components/SEO'
import Input from '@components/Input'

const FormConverter = styled.form`
  position: relative;
  max-width: 12rem;
  margin: 0 auto;
  top: 50vh;

  input {
    margin-bottom: 0.5rem;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const IndexPage: React.FC = () => {
  type StateTypes = {
    convertFrom: string | undefined
    convertTo: string | undefined
  }

  const [stateConvert, setStateConvert] = useState<StateTypes>({
    convertFrom: undefined,
    convertTo: undefined,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength)
    }

    const exp = /^[0-9\b]+$/
    if (
      event.target.validity.valid &&
      (event.target.value === '' || exp.test(event.target.value))
    ) {
      setStateConvert({
        ...stateConvert,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleKeyPress = event => {
    const keyCode = event.keyCode || event.which
    const keyValue = String.fromCharCode(keyCode)
    if (/\+|-/.test(keyValue)) event.preventDefault()
  }

  return (
    <Layout>
      <SEO
        title="Currency Converter"
        description="A minimalistic currency converter"
      />
      <FormConverter method="post" className="pure-g">
        <Input
          value={stateConvert.convertFrom}
          name="convertFrom"
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
        <Input
          value={stateConvert.convertTo}
          name="convertTo"
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
      </FormConverter>
    </Layout>
  )
}

export default IndexPage
