import { createStore, applyMiddleware, AnyAction, Store as ReduxStore, combineReducers} from 'redux'
import { InquiryState, InquiryInterface, InquiryReducer} from '../../src'
import { set } from 'lodash'
const { composeWithDevTools } = require('remote-redux-devtools')

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8100 })

export type Store = ReduxStore<State>

export interface State extends InquiryInterface {
  _inquiry: InquiryState
}

export default (stateFromStorage: State | null): ReduxStore<State> => {
  const defaultState: State = {
    _inquiry: {} as InquiryState
  }
  
  return createStore(combineReducers({
    _inquiry: InquiryReducer
  }), stateFromStorage || defaultState, composeEnhancers(applyMiddleware()))
}
