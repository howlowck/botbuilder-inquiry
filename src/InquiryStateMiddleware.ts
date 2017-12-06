import {Middleware} from 'botbuilder-core'
import {InquiryInterface, InquiryState} from './inquiry/Inquiry'
import {Action} from './inquiry/InquiryActions'
import data from './inquiry/reducers/data'
import incomingMessage from './inquiry/reducers/incomingMessage'
import requesting from './inquiry/reducers/requesting'
import responses from './inquiry/reducers/responses'
import InquiryAbstractMiddleware from './InquiryAbstractMiddleware'

export interface Dispatch<S> {
  <A extends Action>(action: A): A;
}

export interface StateStore<T> {
  getState: () => T
  dispatch: Dispatch<T>
}

function reducer(prevState: InquiryInterface, action: Action) {
  const keys = Object.keys(prevState._inquiry)
  const newInquiryState = prevState._inquiry
  const reducers: {
    [key: string]: any
  } = {
    incomingMessage,
    requesting,
    responses,
    data
  }
  keys.forEach((key: string) => {
    newInquiryState[key] = reducers[key](prevState._inquiry[key], action)
  })

  return {
    ...prevState,
    _inquiry: newInquiryState
  }
}
// const defaultGetStore = (context: BotContext) => context.reduxStore
const stateUndefinedErrorMessage = 
  'context.state is undefined.  Please include the BotStateManager from botbuilder-core'
const conversationUndefinedErrorMessage = 
  'context.state.conversation is undefined. Are you sure you included the BotStateManager correctly?'

function defaultGetStateStore<S extends InquiryInterface>(context: BotContext): StateStore<S> {
  const getState = () : S => {
    if (!context.state) {
      throw new Error(stateUndefinedErrorMessage)
    }
    if (context.state.conversation === undefined) {
      throw new Error(conversationUndefinedErrorMessage)
    }

    if (context.state.conversation._inquiry === undefined) {
      const defaultInquiryState: InquiryState = {
        incomingMessage: '',
        requesting: null,
        responses: [],
        data: {}
      }
      context.state.conversation._inquiry = defaultInquiryState
    }

    return context.state.conversation as S
  }

  return {
    getState,
    dispatch: (action) => {
      const prevState = getState()
      if (context.state.conversation === undefined) {
        throw new Error(conversationUndefinedErrorMessage)
      }
      context.state.conversation = reducer(prevState, action)
      return action
    }
  }
}

export default class InquiryStateMiddleware<S extends InquiryInterface> extends InquiryAbstractMiddleware<S> {
  static getStore: (context: BotContext) => StateStore<InquiryInterface> = defaultGetStateStore
  protected getStore: (context: BotContext) => StateStore<S>
  constructor(getStore: (context: BotContext) => StateStore<S> = defaultGetStateStore) {
    super(getStore)
  }
}