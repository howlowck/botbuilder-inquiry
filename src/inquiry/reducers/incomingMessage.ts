import {Action} from '../InquiryActions'
import {InquiryState as State} from '../Inquiry'

export default (prevState: string|null = null, action: Action): string | null => {
  
  if (action.type === '_INQUIRY_INCOMING_MESSAGE' ) {
    return action.data
  }
  return prevState
}