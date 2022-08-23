import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { rootState } from '../state'

const useSelectorHandler: TypedUseSelectorHook<rootState> = useSelector
export default useSelectorHandler
