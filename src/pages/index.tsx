import React, { useState } from 'react'
import styled from '@emotion/styled'

import Layout from '@components/Layout'
import SEO from '@components/SEO'

const FormConverter = styled.form`
  position: relative;
  max-width: 12rem;
  margin: 0 auto;
  top: 50vh;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const IndexPage: React.FC = () => (
  <Layout>
    <SEO
      title="Currency Converter"
      description="A minimalistic currency converter"
    />
    <FormConverter method="post" className="pure-g">
      <input type="number" className="pure-u-1" />
      <input type="number" className="pure-u-1" />
    </FormConverter>
  </Layout>
)

export default IndexPage
