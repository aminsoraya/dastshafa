import { ProductActionTypeEnum, CartActionTypeEnum } from '../actionEnumTypes'

//Product

interface IProduct {
  id: number
  img: string
  title: string
  description: string
  benefical: string
  weight: number
  price: number
  date: Date
  unit: string
  rate: string
  discount: number
}

export type TProductResult = Omit<IProduct, 'date' | 'unit' | 'rate'>

export interface ICartResult extends TProductResult {
  discountPrice: number
}

interface ILoadingAction {
  type: ProductActionTypeEnum.LOADING
}
interface IDataAction {
  type: ProductActionTypeEnum.DATA
  payload: TProductResult[]
}
interface IErrrorAction {
  type: ProductActionTypeEnum.ERROR
  payload: string
}
interface INotFound {
  type: ProductActionTypeEnum.NOT_FOUND
}

export type ProductTypeAction =
  | ILoadingAction
  | IDataAction
  | IErrrorAction
  | INotFound

//Cart
export interface IActionAddToCart {
  type: CartActionTypeEnum.ADD_TO_CART
  payload: ICartResult
}

export interface IActionRemoveFromCart {
  type: CartActionTypeEnum.REMOVE_FROM_CART
  payload: number
}

export type CartTypeAction = IActionAddToCart | IActionRemoveFromCart
