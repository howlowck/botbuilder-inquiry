import {Action} from '../InquiryActions'
import {set, omit} from 'lodash'
import {InquiryState as State} from '../Inquiry'

export default (prevState: object = {}, action: Action): object => {
  
  if (action.type === '_INQUIRY_ANSWERED') {
    const requestPath = action.requestPath
    return {...set(prevState, requestPath, action.data)}
  }

  if (action.type === '_INQUIRY_SET_VALUE') {
    const requestPath = action.requestPath
    return {...set(prevState, requestPath, action.data)}
  }

  if (action.type === '_INQUIRY_DELETED') {
    const {requestPath} = action
    return {...omit(prevState, [requestPath])}
  }

  return prevState
}