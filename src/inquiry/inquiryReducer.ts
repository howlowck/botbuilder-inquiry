import {combineReducers, Reducer} from 'redux'
import incomingMessage from './reducers/incomingMessage'
import requesting from './reducers/requesting'
import responses from './reducers/responses'
import data from './reducers/data'
import {InquiryState} from './Inquiry'

export default combineReducers<InquiryState>({
  incomingMessage,
  requesting,
  responses,
  data
})