// TODO: Hover animation
// TODO: Click animation
// TODO: Format output with commas
// TODO: SEO data
// TODO: NextJS data fetching
// TODO: Add ads
// TODO: Manifest and PWA
// TODO: NaN error
// TODO: Fix static date in footer
// TODO: Arrow button formatting (on the right)
// TODO: Split file up

import { useState } from "react"
import useSWR from "swr"
import styled from "@emotion/styled"
import { TiArrowSync } from "react-icons/ti"

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
    justify-content: center;
    margin: 1rem;
  }

  input,
  select,
  span {
    border: thin solid gray;
    text-align: left;
    padding-top: 1em;
    padding-bottom: 1em;
  }

  input,
  span {
    padding-left: 1em;
    width: 67%;
    border-right: none;
    border-radius: 0.75rem 0 0 0.75rem;
    line-height: 1.6;
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

  button {
    font-size: 2rem;
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;
    margin-left: auto;
  }

  p {
    text-align: center;
    margin-top: 2rem;
  }

  @media (max-width: 12rem) {
    * {
      font-size: 80%;
    }
  }
`

const FooterUpdatedAt = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100vw;
  text-align: center;
  padding: 1em;
  font-size: 0.8rem;
`

const UPDATE_DAYS = 1

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

const fetchData = (url: RequestInfo): Promise<any> =>
  fetch(url).then((response) => response.json())

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

  const lastUpdatedDate = new Date(data && data.date)

  let currencyNamesArray: [string, number][]
  currencyNamesArray = data && Object.entries(data.rates)
  currencyNamesArray && currencyNamesArray.push([data.base, 1]) //Add base
  currencyNamesArray && currencyNamesArray.sort()

  type StateTypesValues = {
    convertFromValue: number | string | undefined
    convertToValue: number | string | undefined
  }

  const [stateConvertValues, setStateConvertValues] = useState<
    StateTypesValues
  >({
    convertFromValue: undefined,
    convertToValue: "0.00",
  })

  const [stateFromValueMultiplier, setStateFromValueMultiplier] = useState(1)
  const [stateToValueMultiplier, setStateToValueMultiplier] = useState(1)

  type StateTypesSelections = {
    convertFromCurrency: string | undefined
    convertToCurrency: string | undefined
  }

  const [stateConvertSelections, setStateConvertSelections] = useState<
    StateTypesSelections
  >({
    convertFromCurrency: "EUR",
    convertToCurrency: "EUR",
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setStateConvertValues({
      convertFromValue: event.target.value,
      convertToValue: (
        Math.round(
          (+event.target.value / stateFromValueMultiplier) *
            stateToValueMultiplier *
            100
        ) / 100
      ).toFixed(2),
    })
  }

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setStateConvertSelections({
      ...stateConvertSelections,
      [event.target.name]: event.target.value,
    })

    const valueMultiplier = +event.target.options[event.target.selectedIndex]
      .dataset.value

    switch (event.target.name) {
      case "convertFromCurrency":
        setStateFromValueMultiplier(valueMultiplier)
        setStateConvertValues({
          ...stateConvertValues,
          convertToValue: (
            (+stateConvertValues.convertFromValue / valueMultiplier) *
            stateToValueMultiplier
          ).toFixed(2),
        })
        break
      case "convertToCurrency":
        setStateToValueMultiplier(valueMultiplier)
        setStateConvertValues({
          ...stateConvertValues,
          convertToValue: (
            (+stateConvertValues.convertFromValue / stateFromValueMultiplier) *
            valueMultiplier
          ).toFixed(2),
        })
        break
      default:
        break
    }
  }

  const switchCurrencies = () => {
    const prevFromCurrencySelection = stateConvertSelections.convertFromCurrency
    const prevToCurrencySelection = stateConvertSelections.convertToCurrency
    setStateConvertSelections({
      convertFromCurrency: prevToCurrencySelection,
      convertToCurrency: prevFromCurrencySelection,
    })

    const prevFromMultiplier = stateFromValueMultiplier
    const prevToMultiplier = stateToValueMultiplier
    setStateFromValueMultiplier(prevToMultiplier)
    setStateToValueMultiplier(prevFromMultiplier)

    setStateConvertValues({
      ...stateConvertValues,
      convertToValue: (
        Math.round(
          (+stateConvertValues.convertFromValue / prevToMultiplier) *
            prevFromMultiplier *
            100
        ) / 100
      ).toFixed(2),
    })
  }

  // Render
  if (!currencyNamesArray || currencyNamesArray.length < 1) {
    return <p>Loading...</p>
  }

  if (error && error.length > 0) {
    return <p>{`Error: ${error}`}</p>
  }

  return (
    <>
      <Layout>
        <DivConverterWrapper>
          <div>
            <Input
              value={stateConvertValues.convertFromValue}
              name="convertFromValue"
              onChange={handleInputChange}
            />
            <Select
              name="convertFromCurrency"
              currencynamesarray={currencyNamesArray}
              value={stateConvertSelections.convertFromCurrency}
              onChange={handleSelectChange}
            />
          </div>
          <button onClick={switchCurrencies}>
            <TiArrowSync />
          </button>
          <div>
            <span>{stateConvertValues.convertToValue}</span>
            <Select
              name="convertToCurrency"
              currencynamesarray={currencyNamesArray}
              value={stateConvertSelections.convertToCurrency}
              onChange={handleSelectChange}
            />
          </div>
          <p>* rounded up to nearest centesimal</p>
        </DivConverterWrapper>
      </Layout>
      <FooterUpdatedAt>
        <time dateTime={lastUpdatedDate.toISOString()}>
          API last updated on {lastUpdatedDate.toDateString()}
        </time>
      </FooterUpdatedAt>
    </>
  )
}

export default HomePage
