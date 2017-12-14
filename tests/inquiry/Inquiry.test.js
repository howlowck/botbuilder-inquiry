/* global test, expect */
const {createStore, combineReducers} = require('redux')
const data = require('../../build/src/inquiry/reducers/data').default
const incomingMessage = require('../../build/src/inquiry/reducers/incomingMessage').default
const requesting = require('../../build/src/inquiry/reducers/requesting').default
const responses = require('../../build/src/inquiry/reducers/responses').default
const { Inquiry } = require('../../build/src')

// const Inquiry = require('../../build/src/inquiry/Inquiry')
const rootReducer = combineReducers({
  _inquiry: combineReducers({
    incomingMessage,
    requesting,
    responses,
    data
  })
})

test('first turn', () => {
  const store = createStore(rootReducer, {
    _inquiry: {
      incomingMessage: '',
      requesting: '',
      responses: [],
      data: {}
    }
  })

  // const context = {state: {conversation: {}}}
  const inquiry = new Inquiry('info', store)
  const name = inquiry.ask('what is your name?', 'name')

  expect(name).toBe(null)
  expect(store.getState()._inquiry.responses[0]).toBe('what is your name?')
})

test('second turn', () => {
  const store = createStore(rootReducer, {
    _inquiry: {
      incomingMessage: 'Hao',
      requesting: 'info.name',
      responses: [],
      data: {
      }
    }
  })

  const inquiry = new Inquiry('info', store)
  const name = inquiry.ask('what is your name?', 'name')
  const email = inquiry.ask('what is your email?', 'email')

  expect(name).toBe('Hao')
  expect(store.getState()._inquiry.data.info.name).toBe('Hao')
  expect(store.getState()._inquiry.requesting).toBe('info.email')
  expect(email).toBe(null)
})

test('third turn', () => {
  const store = createStore(rootReducer, {
    _inquiry: {
      incomingMessage: 'test@gmail.com',
      requesting: 'info.email',
      responses: [],
      data: {
        info: {
          name: 'Hao'
        }
      }
    }
  })

  const inquiry = new Inquiry('info', store)
  const name = inquiry.ask('what is your name?', 'name')
  const email = inquiry.ask('what is your email?', 'email')
  const birthday = inquiry.ask('what is your birthday?', 'bd')

  expect(name).toBe('Hao')
  expect(email).toBe('test@gmail.com')
  expect(store.getState()._inquiry.data.info.email).toBe('test@gmail.com')
  expect(store.getState()._inquiry.requesting).toBe('info.bd')
  expect(birthday).toBe(null)
})
