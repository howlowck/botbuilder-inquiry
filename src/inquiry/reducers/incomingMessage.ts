import {Action} from '../InquiryActions'
import {InquiryState as State} from '../Inquiry'

export default (prevState: string|null = '', action: Action): string | null => {
  if (action.type === '_INQUIRY_INCOMING_MESSAGE' ) {
    return action.data || null
  }
  return prevState
}