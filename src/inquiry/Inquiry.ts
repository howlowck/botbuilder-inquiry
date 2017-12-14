import {Store as ReduxStore} from 'redux'
import {get, includes} from 'lodash'
import { StoreItem } from 'botbuilder-core';
import {StateStore} from '../InquiryStateMiddleware'
import {Action} from './InquiryActions'
// import State from './state'

export interface InquiryState {
  [key: string]: any,
  incomingMessage: string | null,
  responses: string[],
  requesting: string | null,
  data: {
    [key: string]: any
  }
}

export interface InquiryInterface extends StoreItem {
  _inquiry: InquiryState
}

export type Transformer = (incomingMessage: string) => any

export type Validator = {
  validate: (incomingMessage: string) => boolean
  retry?: string
}

/**
 * Inquiry is the class that encapsulates the store logic that manages your information gathering.
 * 
 * @template T The State Object that should extend InquiryInterface
 */

export default class Inquiry<T extends InquiryInterface> {
  /**
   * 
   */
    protected convoName: string
    protected store: ReduxStore<T> | StateStore<T>

    static text (strings: TemplateStringsArray, ...keys: Array<string|null|undefined>): string | null { 
      // tagged template literal
      if (includes(keys, null) || includes(keys, undefined)) {
        return null
      }
    
      const str = strings.reduce((prev, current, index) => {
        return prev + current + (keys[index] || '') // keys will always have one less than strings
      }, '')
    
      return str
    }

    static render (context: BotContext, store: ReduxStore<InquiryInterface> | StateStore<InquiryInterface>) {
      store.getState()._inquiry.responses.forEach((value) => {
        context.reply(value)
      })
    }

    constructor (convoName: string, store: ReduxStore<T> | StateStore<T>) {
      this.convoName = convoName
      this.store = store
    }

    protected getRequestPath (type: string) {
      return `${this.convoName}.${type}`
    }

    protected getValue (state: T, type: string, def?: any) {
      return get(state, '_inquiry.data.' + this.getRequestPath(type), def)
    }

    ask (
      question: string, 
      type: string, 
      validators: Validator[] = [],
      transformer?: Transformer
    ): any {
      const {getState, dispatch} = this.store
      const requestPath = this.getRequestPath(type)

      // if state is not requesting anything, asking the question
      if (!(getState()._inquiry.requesting)) {
        dispatch({type: '_INQUIRY_SEND_TEXT', data: question})
        dispatch({type: '_INQUIRY_ASK', data: requestPath})
        return null
      }
  
      if (getState()._inquiry.requesting === requestPath) { // if state is requesting this ask type (question)
        let result: string = getState()._inquiry.incomingMessage as string

        const failedValidator = validators.find((validator) => ! validator.validate(result)) // run validations
        if (failedValidator) {
          dispatch({type: '_INQUIRY_SEND_TEXT', data: failedValidator.retry})
          return null
        }
        if (transformer) {
          result = transformer(result)
        }

        dispatch({type: '_INQUIRY_ANSWERED', requestPath: this.convoName + '.' + type, data: result})
        return this.getValue(getState(), type)
      }
  
      return this.getValue(getState(), type)
    }

    askAgain(question: string, type: string): void {
      this.ask(question, type)
      this.delete(type)
    }

    hasValue(type: string) {
      const {getState} = this.store
      return (typeof this.getValue(getState(), type)) !== 'undefined'
    }

    get(type: string, defaultValue?: any) {
      const {getState} = this.store
      const value = this.getValue(getState(), type)
      return typeof value === 'undefined' ? defaultValue : value
    }

    set(type: string, value: string|Array<any>|object|number|boolean) {
      const {getState, dispatch} = this.store
      dispatch({type: '_INQUIRY_SET_VALUE', requestPath: this.convoName + '.' + type, data: value})
    }

    delete(type: string) {
      const {dispatch} = this.store
      dispatch({type: '_INQUIRY_DELETED', requestPath: this.convoName + '.' + type})
    }
  
    reply (message: string | null): void {
      const {dispatch} = this.store
      if (message) {
        dispatch({type: '_INQUIRY_SEND_TEXT', data: message})
      }
    }
}
