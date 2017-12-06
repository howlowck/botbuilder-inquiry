import {Action} from '../InquiryActions'
import {InquiryState as State} from '../Inquiry'

export default (prevState: string|null = null, action: Action): string | null => {
  if (action.type === '_INQUIRY_ANSWERED' && prevState !== null) {
    return ''
  }

  if (action.type === '_INQUIRY_ASK' && !prevState) {
    return action.data
  }

  return prevState
}