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

export interface IProductResult
  extends Omit<IProduct, 'date' | 'unit' | 'rate'> {
  discountPrice: number
}

interface ILoadingAction {
  type: ProductActionTypeEnum.LOADING
}
interface IDataAction {
  type: ProductActionTypeEnum.DATA
  payload: IProductResult[]
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
  payload: IProductResult
}

export interface IActionRemoveFromCart {
  type: CartActionTypeEnum.REMOVE_FROM_CART
  payload: number
}

export type CartTypeAction = IActionAddToCart | IActionRemoveFromCart
