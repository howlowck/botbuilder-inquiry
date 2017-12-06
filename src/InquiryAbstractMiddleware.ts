import {Middleware} from 'botbuilder-core'
import {Store as ReduxStore} from 'redux'
import {InquiryInterface} from './inquiry/Inquiry'
import { StateStore } from './InquiryStateMiddleware';

declare global {
  export interface BotContext {
    reduxStore: ReduxStore<any>
  }
}

export default abstract class InquiryMiddleware<S extends InquiryInterface> implements Middleware {
  protected getStore: (context: BotContext) => ReduxStore<S> | StateStore<S>
  
  constructor (getStore: (context: BotContext) => ReduxStore<S> | StateStore<S>) {
    this.getStore = getStore
  }

  contextCreated (context: BotContext) {
    const store = this.getStore(context)
    store.dispatch({type: '_INQUIRY_CLEAR_RESPONSES'})
    store.dispatch({type: '_INQUIRY_INCOMING_MESSAGE', data: context.request.text})
  }
}