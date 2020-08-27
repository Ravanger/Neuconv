import { useState } from "react"
import useSWR from "swr"
import styled from "@emotion/styled"

import useLocalStorage from "@hooks/useLocalStorage"
import Layout from "@components/Layout"
import Input from "@components/Input"
import Select from "@components/Select"

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

const Home = () => {
  const [ratesData, setRatesdata] = useLocalStorage("data", "")

  const apiUrl: string | null =
    !areRatesUpToDate(ratesData) &&
    process.env.API_URL &&
    process.env.API_URL.length > 0
      ? (process.env.API_URL as string)
      : null

  console.log(apiUrl)

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
    convertFromCurrency: "EUR",
    convertToCurrency: "CAD",
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setStateConvert({
      ...stateConvert,
      [event.target.name]: event.target.value,
    })
    if (event.target.name === "convertFromValue") {
    } else if (event.target.name === "convertToValue") {
    }
  }

  if (!currencyNamesArray || currencyNamesArray.length < 1) {
    return <p>Loading...</p>
  }

  if (error && error.length > 0) {
    return <p>{`Error: ${error}`}</p>
  }

  return (
    <Layout>
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

export default Home
