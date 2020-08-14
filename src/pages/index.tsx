import React, { useState } from 'react'
import useSWR, { SWRConfig } from 'swr'
import styled from '@emotion/styled'

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

  div {
    display: flex;
    justify-content: center;
    margin: 1rem;
  }

  input,
  select {
    padding: 1em;
    border: thin solid gray;
  }

  input {
    border-right: none;
    border-radius: 0.75rem 0 0 0.75rem;
  }

  select {
    border-left: none;
    border-radius: 0 0.75rem 0.75rem 0;
    appearance: none;
    background-image: linear-gradient(gray, gray),
      linear-gradient(-135deg, transparent 50%, white 50%),
      linear-gradient(-225deg, transparent 50%, white 50%),
      linear-gradient(white 42%, gray 42%);
    background-repeat: no-repeat;
    background-size: 1px 100%, 1rem 2.5rem, 1rem 2.5rem, 1rem 100%;
    background-position: right 1rem center, right bottom, right bottom,
      right bottom;
  }

  @media (max-width: 14em) {
    * {
      font-size: 75%;
    }
  }
`

const fetchData = (url: RequestInfo): Promise<any> =>
  fetch(url).then(response => response.json())

const IndexPage: React.FC = () => {
  const apiUrl: string | null =
    process.env.GATSBY_API_URL && process.env.GATSBY_API_URL.length > 0
      ? (process.env.GATSBY_API_URL as string)
      : null
  const { data, error } = useSWR(apiUrl, {
    fetcher: fetchData,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 86400, //24 hours
  })

  let currencyNamesArray: string[] = []
  currencyNamesArray = data && Object.keys(data.rates)
  currencyNamesArray && currencyNamesArray.push(data.base) //Add base
  currencyNamesArray && currencyNamesArray.sort()

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setStateConvert({
      ...stateConvert,
      [event.target.name]: event.target.value,
    })
    if (event.target.name === 'convertFromValue') {
    } else if (event.target.name === 'convertToValue') {
    }
  }

  if (!currencyNamesArray) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <Layout>
      <SEO
        title="Currency Converter"
        description="A minimalistic currency converter"
      />
      <FormConverter method="post">
        <div>
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
        </div>
        <div>
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
        </div>
      </FormConverter>
    </Layout>
  )
}

export default IndexPage
