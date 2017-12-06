import {Middleware} from 'botbuilder-core'
import {Store as ReduxStore} from 'redux'
import {InquiryInterface} from './inquiry/Inquiry'
import InquiryAbstractMiddleware from './InquiryAbstractMiddleware'

declare global {
  export interface BotContext {
    reduxStore: ReduxStore<any>
  }
}

const defaultGetStore = (context: BotContext) => context.reduxStore

export default class InquiryReduxMiddleware<S extends InquiryInterface> extends InquiryAbstractMiddleware<S> {
  static getStore = defaultGetStore
  protected getStore: (context: BotContext) => ReduxStore<S>
  constructor (getStore: (context: BotContext) => ReduxStore<S> = defaultGetStore) {
    super(getStore)
  }
}