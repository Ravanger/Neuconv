import React from 'react'

type InputProps = {
  value: number | undefined
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps): JSX.Element => {
  return (
    <input
      type="number"
      className="pure-u-1"
      onChange={props.handleChange}
      value={props.value}
      name="convertTo"
      placeholder="0"
      maxLength={9}
    />
  )
}

export default Input
