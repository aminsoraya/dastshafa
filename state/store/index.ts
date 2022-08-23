import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducer'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'

export const store = createStore(reducers, {}, applyMiddleware(thunk))
export const persistor = persistStore(store)
