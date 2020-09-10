// TODO: Format output with commas
// TODO: Add ads
// TODO: Manifest and PWA, icon
// TODO: Dropbox open animation
// TODO: Backend scraper

import { useState } from "react"
import styled from "@emotion/styled"
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
    margin: 1rem 0.25rem 1rem 2.25rem;

    > div {
      flex-direction: row;
      align-items: center;
      border-radius: 0.75rem;
      box-shadow: inset 0.25em 0.25em 0.5em #d1d9e6,
        inset calc(-1 * 0.25em) calc(-1 * 0.25em) 0.5em #ffffff; /* ie */
      box-shadow: inset var(--radius-size) var(--radius-size) var(--blur-size)
          var(--color-shadow),
        inset calc(-1 * var(--radius-size)) calc(-1 * var(--radius-size))
          var(--blur-size) var(--color-hightlight);
      padding: 0.25rem;
      padding-right: 0;
    }
  }

  input,
  select,
  span {
    border: none;
    text-align: left;
    padding: 1em;
    padding-left: 0;
    background: none;
    color: #9567f1;
    color: var(--color-accent);
    font-size: 0.8rem;
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
    border: none;
    border-radius: 0.75rem;
    outline: none;
    appearance: none;
    cursor: pointer;
    box-shadow: 0.25em 0.25em 0.5em #d1d9e6,
      calc(-1 * 0.25em) calc(-1 * 0.25em) 0.5em #ffffff; /* ie */
    box-shadow: var(--radius-size) var(--radius-size) var(--blur-size)
        var(--color-shadow),
      calc(-1 * var(--radius-size)) calc(-1 * var(--radius-size))
        var(--blur-size) var(--color-hightlight);
    width: fit-content;
    height: fit-content;
    color: #ffffff;
    padding-right: 0.8rem;
    padding-left: 0.3rem;
    background-color: #9567f1; /* ie */
    background-color: var(--color-accent);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: end;

    &::after {
      content: "▾";
      font-family: Arial, Helvetica, sans-serif;
      color: var(--color-hightlight);
      font-size: 1.75rem;
      position: absolute;
      pointer-events: none;
    }
  }

  option {
    direction: rtl;
  }

  button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.2rem;
    color: var(--color-accent);
    line-height: 1;
    height: 2rem;
    width: 2rem;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.1s;
    outline: none;
    border-radius: 0.75rem;
    box-shadow: 0.25em 0.25em 0.5em #d1d9e6,
      calc(-1 * 0.25em) calc(-1 * 0.25em) 0.5em #ffffff; /* ie */
    box-shadow: var(--radius-size) var(--radius-size) var(--blur-size)
        var(--color-shadow),
      calc(-1 * var(--radius-size)) calc(-1 * var(--radius-size))
        var(--blur-size) var(--color-hightlight);
    margin-right: 1rem;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      box-shadow: inset 0.25em 0.25em 0.5em #d1d9e6,
        inset calc(-1 * 0.25em) calc(-1 * 0.25em) 0.5em #ffffff; /* ie */
      box-shadow: inset var(--radius-size) var(--radius-size) var(--blur-size)
          var(--color-shadow),
        inset calc(-1 * var(--radius-size)) calc(-1 * var(--radius-size))
          var(--blur-size) var(--color-hightlight);
      transform: scale(1);
      transition: transform 0s;
    }
  }

  .topSpanWrapper {
    padding: 0;
  }

  @media (max-width: 12rem) {
    * {
      font-size: 80%;
    }
  }
`

const PRoundedUp = styled.p`
  text-align: center;
  color: hsla(0, 0%, 0%, 0.6);
`

const FooterBottom = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100vw;
  text-align: center;
  padding: 1em;
  font-size: 0.8rem;
  color: hsla(0, 0%, 0%, 0.6);
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
              <span className="topSpanWrapper">
                <Input
                  value={stateConvertValues.convertFromValue}
                  name="convertFromValue"
                  id="convertFromValue"
                  onChange={handleInputChange}
                />
              </span>
              <label>
                <Select
                  name="convertFromCurrency"
                  id="convertFromCurrency"
                  currencynamesarray={currencyNamesArray}
                  value={stateConvertSelections.convertFromCurrency}
                  onChange={handleSelectChange}
                />
              </label>
            </div>
            <div>
              <span>{stateConvertValues.convertToValue}</span>
              <label>
                <Select
                  name="convertToCurrency"
                  id="convertToCurrency"
                  currencynamesarray={currencyNamesArray}
                  value={stateConvertSelections.convertToCurrency}
                  onChange={handleSelectChange}
                />
              </label>
            </div>
          </div>
          <button onClick={switchCurrencies} aria-label="Switch currencies">
            ⇅
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
