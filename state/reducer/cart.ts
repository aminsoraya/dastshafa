import { ICartResult, CartTypeAction } from '../actionTypes'
import { CartActionTypeEnum } from '../actionEnumTypes'

interface IState {
  cart: ICartResult[]
}
const initialState = {
  cart: [],
}
const CartReducer = (
  state: IState = initialState,
  action: CartTypeAction,
): IState => {
  switch (action.type) {
    case CartActionTypeEnum.ADD_TO_CART:
      let { cart } = state
      let findIndex = cart.findIndex((item) => item.id == action.payload.id)

      if (findIndex == -1) {
        state.cart = [...cart, action.payload]
      } else {
        state.cart[findIndex] = action.payload
      }

      return { cart: state.cart }

    case CartActionTypeEnum.REMOVE_FROM_CART:
      let filterResult = [...state.cart].filter(
        ({ id }) => id != action.payload,
      )
      state.cart = filterResult
      return { cart: state.cart }
    default:
      return state
  }
}
export default CartReducer
