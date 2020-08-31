import { useState } from "react"
import useSWR from "swr"
import styled from "@emotion/styled"

import useLocalStorage from "@hooks/useLocalStorage"
import Layout from "@components/Layout"
import Input from "@components/Input"
import Select from "@components/Select"

const DivConverterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 18rem;
  font-size: 0.8rem;

  div {
    display: flex;
    margin: 1rem;
  }

  input,
  select,
  p {
    border: thin solid gray;
    text-align: left;
    padding-top: 1em;
    padding-bottom: 1em;
  }

  input,
  p {
    padding-left: 1em;
    width: 67%;
    border-right: none;
    border-radius: 0.75rem 0 0 0.75rem;
    line-height: 1.6;
  }

  p {
    color: grey;
  }

  select {
    width: 33%;
    border-left: none;
    border-radius: 0 0.75rem 0.75rem 0;
    appearance: menulist-button;
    text-align: right;
  }

  option {
    direction: rtl;
  }

  @media (max-width: 12rem) {
    * {
      font-size: 80%;
    }
  }
`

const UPDATE_DAYS = 1

const fetchData = (url: RequestInfo): Promise<any> =>
  fetch(url).then((response) => response.json())

// https://stackoverflow.com/a/19691491/2717464
const addDays = (date: Date, days: number) => {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const areRatesUpToDate = (ratesData: any) => {
  if (
    !ratesData ||
    ratesData.length < 1 ||
    !ratesData.dateUpdated ||
    ratesData.dateUpdated.length < 1
  ) {
    return false
  }

  const currentDate = new Date()
  if (currentDate > addDays(new Date(ratesData.dateUpdated), UPDATE_DAYS)) {
    return false
  }

  return true
}

const HomePage = () => {
  const [ratesData, setRatesdata] = useLocalStorage("data", "")

  const apiUrl: string | null =
    !areRatesUpToDate(ratesData) &&
    process.env.API_URL &&
    process.env.API_URL.length > 0
      ? (process.env.API_URL as string)
      : null

  let { data, error } = useSWR(apiUrl, {
    fetcher: fetchData,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  if (data) {
    data.dateUpdated = new Date()
    setRatesdata(data)
  }
  if (!apiUrl) {
    data = ratesData
  }

  let currencyNamesArray: [string, number][]
  currencyNamesArray = data && Object.entries(data.rates)
  currencyNamesArray && currencyNamesArray.push([data.base, 1]) //Add base
  currencyNamesArray && currencyNamesArray.sort()

  type StateTypes = {
    convertFromValue: number | string | undefined
    convertToValue: number | string | undefined
    convertFromCurrency: string | undefined
    convertToCurrency: string | undefined
  }

  const [stateConvert, setStateConvert] = useState<StateTypes>({
    convertFromValue: undefined,
    convertToValue: "0.00",
    convertFromCurrency: "EUR",
    convertToCurrency: "CAD",
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setStateConvert({
      ...stateConvert,
      convertFromValue: event.target.value,
      convertToValue: (+event.target.value * 10).toFixed(2),
    })
  }

  if (!currencyNamesArray || currencyNamesArray.length < 1) {
    return <p>Loading...</p>
  }

  if (error && error.length > 0) {
    return <p>{`Error: ${error}`}</p>
  }

  return (
    <Layout>
      <DivConverterWrapper>
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
          <p>{stateConvert.convertToValue}</p>
          <Select
            name="convertToCurrency"
            currencynamesarray={currencyNamesArray}
            value={stateConvert.convertToCurrency}
            onChange={handleChange}
          />
        </div>
      </DivConverterWrapper>
    </Layout>
  )
}

export default HomePage
