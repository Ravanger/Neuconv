import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import useFetch from '@hooks/useFetch'

import Layout from '@components/Layout'
import SEO from '@components/SEO'
import Input from '@components/Input'
import Select from '@components/Select'

const FormConverter = styled.form`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;

  label {
    display: block;
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
  const apiUrlData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            apiUrl
          }
        }
      }
    `
  )
  const apiUrl: RequestInfo = apiUrlData.site.siteMetadata.apiUrl

  type StateTypes = {
    convertFromValue: number | undefined
    convertToValue: number | undefined
    convertFromCurrency: string | undefined
    convertToCurrency: string | undefined
  }

  const [stateConvert, setStateConvert] = useState<StateTypes>({
    convertFromValue: undefined,
    convertToValue: undefined,
    convertFromCurrency: 'EUR',
    convertToCurrency: 'CAD',
  })

  let currencyNamesArray: string[] = []
  const { data, isLoading, hasError, errorMessage } = useFetch({
    url: apiUrl,
  })
  if (hasError) {
    console.error(errorMessage)
  } else {
    currencyNamesArray = data && Object.keys(data.rates)
    currencyNamesArray && currencyNamesArray.push(data.base) //Add base
    currencyNamesArray && currencyNamesArray.sort()
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setStateConvert({
      ...stateConvert,
      [event.target.name]: event.target.value,
    })
  }

  return isLoading || !currencyNamesArray ? (
    <p>Loading...</p>
  ) : (
    <Layout>
      <SEO
        title="Currency Converter"
        description="A minimalistic currency converter"
      />
      <FormConverter method="post">
        <label>
          <Input
            value={stateConvert.convertFromValue}
            name="convertFromValue"
            onChange={handleChange}
          />
          <Select
            name="convertFromCurrency"
            currencynamesarray={currencyNamesArray}
            value={stateConvert.convertFromCurrency}
            onChange={handleChange}
          />
        </label>
        <label>
          <Input
            value={stateConvert.convertToValue}
            name="convertToValue"
            onChange={handleChange}
          />
          <Select
            name="convertToCurrency"
            currencynamesarray={currencyNamesArray}
            value={stateConvert.convertToCurrency}
            onChange={handleChange}
          />
        </label>
      </FormConverter>
    </Layout>
  )
}

export default IndexPage
