import React, { useState } from 'react'
import styled from '@emotion/styled'

import Layout from '@components/Layout'
import SEO from '@components/SEO'
import Input from '@components/Input'

const FormConverter = styled.form`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setStateConvert({
      ...stateConvert,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Layout>
      <SEO
        title="Currency Converter"
        description="A minimalistic currency converter"
      />
      <FormConverter method="post">
        <Input
          value={stateConvert.convertFrom}
          name="convertFrom"
          onChange={handleChange}
        />
        <Input
          value={stateConvert.convertTo}
          name="convertTo"
          onChange={handleChange}
        />
      </FormConverter>
    </Layout>
  )
}

export default IndexPage
