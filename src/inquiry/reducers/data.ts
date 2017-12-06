import {Action} from '../InquiryActions'
import {set} from 'lodash'
import {InquiryState as State} from '../Inquiry'

export default (prevState: object = {}, action: Action): object => {
  
  if (action.type === '_INQUIRY_ANSWERED') {
    const requestPath = action.requestPath
    return {...set(prevState, requestPath, action.data)}
  }

  return prevState
}