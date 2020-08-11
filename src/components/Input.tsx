import React from 'react'

type InputProps = {
  value: string | undefined
  name: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps): JSX.Element => {
  return (
    <input
      type="number"
      className="pure-u-1"
      onChange={props.handleChange}
      value={props.value}
      name={props.name}
      placeholder="0"
      maxLength={9}
      onKeyPress={props.handleKeyPress}
    />
  )
}

export default Input
