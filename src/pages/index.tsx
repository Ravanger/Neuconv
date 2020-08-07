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
    convertFrom: number | undefined
    convertTo: number | undefined
  }

  const [stateConvert, setStateConvert] = useState<StateTypes>({
    convertFrom: undefined,
    convertTo: undefined,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength)
    }

    setStateConvert({
      ...stateConvert,
      convertTo: +event.target.value,
      convertFrom: +event.target.value,
    })
  }

  return (
    <Layout>
      <SEO
        title="Currency Converter"
        description="A minimalistic currency converter"
      />
      <FormConverter method="post" className="pure-g">
        <Input value={stateConvert.convertFrom} handleChange={handleChange} />
        <Input value={stateConvert.convertTo} handleChange={handleChange} />
      </FormConverter>
    </Layout>
  )
}

export default IndexPage
