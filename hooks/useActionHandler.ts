import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { actionCreators } from '../state'

const useActionHandler = () => {
  const dispatch = useDispatch()

  return bindActionCreators(actionCreators, dispatch)
}
export default useActionHandler
