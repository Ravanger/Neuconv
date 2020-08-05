import React, { useState } from 'react'
import styled from '@emotion/styled'

import Layout from '@components/Layout'
import SEO from '@components/SEO'

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
        <input
          type="number"
          className="pure-u-1"
          onChange={handleChange}
          value={stateConvert.convertFrom}
          name="convertFrom"
          placeholder="0"
        />
        <input
          type="number"
          className="pure-u-1"
          onChange={handleChange}
          value={stateConvert.convertTo}
          name="convertTo"
          placeholder="0"
        />
      </FormConverter>
    </Layout>
  )
}

export default IndexPage
