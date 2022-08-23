import { combineReducers } from 'redux'
import productReducer from './product'
import cartReducer from './cart'

const reducers = combineReducers({
  products: productReducer,
  cart: cartReducer,
})

export default reducers
export type rootState = ReturnType<typeof reducers>
