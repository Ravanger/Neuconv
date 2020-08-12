import React from 'react'
import styled from '@emotion/styled'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

type InputProps = {
  value: number | undefined
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledInput = styled(MaskedInput)`
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5rem;
`

const defaultMaskOptions = {
  prefix: '',
  includeThousandsSeparator: false,
  allowDecimal: true,
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: false,
  allowLeadingZeroes: false,
}
const currencyMask = createNumberMask(defaultMaskOptions)

const Input = (props: InputProps): JSX.Element => {
  return (
    <StyledInput
      {...props}
      mask={currencyMask}
      inputMode="decimal"
      placeholder="0.00"
    />
  )
}

export default Input
