import { createContext } from 'react'
import { IScroll } from './Type'

const initial = {
  scroll: false,
}
const Context = createContext<IScroll>(initial)
export default Context
