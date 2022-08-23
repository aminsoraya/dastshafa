import { combineReducers } from 'redux'
import productReducer from './product'
import cartReducer from './cart'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const cartPersistedReducer = persistReducer(persistConfig, cartReducer)

const reducers = combineReducers({
  products: productReducer,
  cart: cartPersistedReducer,
})

export default reducers
export type rootState = ReturnType<typeof reducers>
