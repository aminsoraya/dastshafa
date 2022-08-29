import { AlertColor } from '@mui/material'

const NumberCommaSeperator = (num: string) => {
  return parseFloat(num)?.toLocaleString()
}
const ChangeEnNumberToPer = (num: any) => {
  return num
    ?.toString()
    .replace(/0/g, '۰')
    .replace(/1/g, '۱')
    .replace(/2/g, '۲')
    .replace(/3/g, '۳')
    .replace(/4/g, '۴')
    .replace(/5/g, '۵')
    .replace(/6/g, '۶')
    .replace(/7/g, '۷')
    .replace(/8/g, '۸')
    .replace(/9/g, '۹')
}

const IsNumberEntered = (keyCode: any): boolean => {
  if (
    (keyCode < 48 || keyCode > 57) &&
    (keyCode < 96 || keyCode > 105) &&
    keyCode != 8 &&
    keyCode != 46 &&
    keyCode != 39 &&
    keyCode != 37
  )
    return false
  return true
}

const CalculateDiscount = (price: number, discount: number) => {
  let discountPrice: number = price * (discount / 100)
  return price - discountPrice
}

export {
  NumberCommaSeperator,
  ChangeEnNumberToPer,
  CalculateDiscount,
  IsNumberEntered,
}

export interface IAddToCartVariable {
  text: string | undefined
  severity: AlertColor | undefined
}
export interface IAddToCart extends IAddToCartVariable {
  open: boolean
  handleClose: () => void
}

type TFullScreenDialog = Pick<IAddToCart, 'handleClose' | 'open' | 'text'>

export interface IFullScreenDialog extends TFullScreenDialog {
  title: string | undefined
}

export type IFullScreenDialogVariable = Pick<
  IFullScreenDialog,
  'title' | 'text'
>

export interface IArticle {
  img: string
  id: number
  title: string
  body: string
  date: Date
}
