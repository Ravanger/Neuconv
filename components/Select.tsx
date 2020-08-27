import React from "react"

type SelectProps = {
  name: string
  value: string | undefined
  currencynamesarray: string[]
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = (props: SelectProps) => {
  return (
    <select {...props}>
      {props.currencynamesarray &&
        props.currencynamesarray.map((currencyName, index) => (
          <option value={currencyName} key={index}>
            {currencyName}
          </option>
        ))}
    </select>
  )
}

export default Select
