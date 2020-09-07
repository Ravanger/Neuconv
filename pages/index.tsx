// TODO: Format output with commas
// TODO: Add ads
// TODO: Manifest and PWA
// TODO: Nick's design

import { useState } from "react"
import styled from "@emotion/styled"
import { TiArrowSync } from "react-icons/ti"
import { GetStaticProps } from "next"

import Layout from "@components/Layout"
import Input from "@components/Input"
import Select from "@components/Select"
import SEO from "@components/SEO"

const DivConverterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 0.8rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem;
    margin-right: 0;

    > div {
      flex-direction: row;
    }
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
    display: flex;
    font-size: 2rem;
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;
    transition: transform ease 0.2s;
    outline: none;

    &:hover {
      transform: rotateZ(180deg);
    }

    &:active {
      transform: rotateZ(360deg);
      transition: transform ease 0.1s;
    }
  }

  @media (max-width: 12rem) {
    * {
      font-size: 80%;
    }
  }
`

const PRoundedUp = styled.p`
  text-align: center;
  font-size: 0.8rem;
`

const FooterBottom = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100vw;
  text-align: center;
  padding: 1em;
  font-size: 0.8rem;
`

const HomePage = ({ ratesData }: any) => {
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

  const lastUpdatedDate = new Date(ratesData && ratesData.date)

  let currencyNamesArray: [string, number][]
  currencyNamesArray = ratesData && Object.entries(ratesData.rates)
  currencyNamesArray && currencyNamesArray.push([ratesData.base, 1]) //Add base
  currencyNamesArray && currencyNamesArray.sort()

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

    const valueMultiplierValue =
      event.target.options[event.target.selectedIndex].dataset.value
    const valueMultiplier = valueMultiplierValue ? +valueMultiplierValue : 0

    const convertFromValue = stateConvertValues.convertFromValue
      ? +stateConvertValues.convertFromValue
      : 0

    switch (event.target.name) {
      case "convertFromCurrency":
        setStateFromValueMultiplier(valueMultiplier)
        setStateConvertValues({
          ...stateConvertValues,
          convertToValue: (
            (convertFromValue / valueMultiplier) *
            stateToValueMultiplier
          ).toFixed(2),
        })
        break
      case "convertToCurrency":
        setStateToValueMultiplier(valueMultiplier)
        setStateConvertValues({
          ...stateConvertValues,
          convertToValue: (
            (convertFromValue / stateFromValueMultiplier) *
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

    const convertFromValue = stateConvertValues.convertFromValue
      ? +stateConvertValues.convertFromValue
      : 0

    setStateConvertValues({
      ...stateConvertValues,
      convertToValue: (
        Math.round(
          (convertFromValue / prevToMultiplier) * prevFromMultiplier * 100
        ) / 100
      ).toFixed(2),
    })
  }

  // Render
  if (!currencyNamesArray || currencyNamesArray.length < 1) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )
  }

  return (
    <>
      <SEO
        title="Neuconv"
        description="A minimalistic currency converter"
        keywords="Minimalistic,currency,converter,money,exchange"
        author="Boris Rossovsky"
        pageUrl="https://currency-converter.ravanger.vercel.app"
      />
      <Layout>
        <DivConverterWrapper>
          <div>
            <div>
              <Input
                value={stateConvertValues.convertFromValue}
                name="convertFromValue"
                id="convertFromValue"
                onChange={handleInputChange}
              />
              <Select
                name="convertFromCurrency"
                id="convertFromCurrency"
                currencynamesarray={currencyNamesArray}
                value={stateConvertSelections.convertFromCurrency}
                onChange={handleSelectChange}
              />
            </div>
            <div>
              <span>{stateConvertValues.convertToValue}</span>
              <Select
                name="convertToCurrency"
                id="convertToCurrency"
                currencynamesarray={currencyNamesArray}
                value={stateConvertSelections.convertToCurrency}
                onChange={handleSelectChange}
              />
            </div>
          </div>
          <button onClick={switchCurrencies} aria-label="Switch currencies">
            <TiArrowSync />
          </button>
        </DivConverterWrapper>
        <PRoundedUp>* rounded up to nearest centesimal</PRoundedUp>
      </Layout>
      <FooterBottom>
        <time dateTime={lastUpdatedDate.toISOString()}>
          API last updated on {lastUpdatedDate.toDateString()}
        </time>
      </FooterBottom>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL)
    const ratesData = await res.json()

    return {
      props: {
        ratesData,
      },
      revalidate: 86400, // 24 hours in seconds
    }
  }

  return {
    props: {},
    revalidate: 86400, // 24 hours in seconds
  }
}

export default HomePage
