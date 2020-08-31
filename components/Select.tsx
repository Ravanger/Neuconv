import React from "react"

type SelectProps = {
  name: string
  value: string | undefined
  currencynamesarray: [string, number][]
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = (props: SelectProps) => {
  return (
    <select {...props}>
      {props.currencynamesarray &&
        props.currencynamesarray.map((currencyName, index) => (
          <option label={currencyName[0]} key={index} value={currencyName[1]}>
            {currencyName[0]}
          </option>
        ))}
    </select>
  )
}

export default Select
