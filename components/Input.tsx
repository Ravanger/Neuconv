import { ChangeEvent } from "react"
import MaskedInput from "react-text-mask"
import createNumberMask from "text-mask-addons/dist/createNumberMask"

type InputProps = {
  value: number | string | undefined
  name: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  id?: string
}

const defaultMaskOptions = {
  prefix: "",
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
    <MaskedInput
      {...props}
      mask={currencyMask}
      inputMode="decimal"
      placeholder="0.00"
    />
  )
}

export default Input
