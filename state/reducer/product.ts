import { ProductActionTypeEnum } from '../actionEnumTypes'
import { ProductTypeAction } from '../actionTypes'
import { IProductResult } from '../actionTypes'

interface IState {
  loading: boolean
  data: IProductResult[]
  error: string
  notFound?: boolean
}
const initialState = {
  loading: false,
  data: [],
  error: '',
  notFound: false,
}

const productReducer = (
  state: IState = initialState,
  action: ProductTypeAction,
): IState => {
  switch (action.type) {
    case ProductActionTypeEnum.LOADING:
      return { loading: true, data: [], error: '' }
    case ProductActionTypeEnum.DATA:
      return { loading: false, data: action.payload, error: '' }
    case ProductActionTypeEnum.ERROR:
      return { loading: false, data: [], error: action.payload }
    case ProductActionTypeEnum.NOT_FOUND:
      return { loading: false, data: [], error: '', notFound: true }
    default:
      return state
  }
}

export default productReducer
