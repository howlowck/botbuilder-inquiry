import {Action} from '../InquiryActions'
import {InquiryState as State} from '../Inquiry'

export default (prevState: string[] = [], action: Action): string[] => {
  if (action.type === '_INQUIRY_SEND_TEXT') {
    return [...prevState, action.data]
  }

  if (action.type === '_INQUIRY_CLEAR_RESPONSES') {
    return []
  }
  
  return prevState
}