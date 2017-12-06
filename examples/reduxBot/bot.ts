require('dotenv').config({path: 'examples/assistantBot/.env'})
import { Bot, MemoryStorage } from 'botbuilder-core'
import { BotFrameworkAdapter } from 'botbuilder-services'
import { get, includes } from 'lodash'
import {
  Inquiry,
  InquiryReduxMiddleware,
  InquiryValidator
} from '../../src'
import BotReduxMiddleware, {getStore} from 'botbuilder-redux'
import { Store as ReduxStore } from 'redux'
const restify = require('restify')
import createStore, {State, Store} from './createStore'
import fetch from 'node-fetch'
import infoTopic from '../topics/infoTopic'
import bookFlightTopic from '../topics/bookFlightTopic'

const {render} = Inquiry

const remotedev = require('remotedev-server')
// if you see a weird Compilation error: https://github.com/uNetworking/uWebSockets/pull/526/files
remotedev({ hostname: 'localhost', port: 8100 })

const {APP_ID, LUIS_ENDPOINT, LUIS_KEY} = process.env as {
  [key: string]: string
}

if (typeof APP_ID === 'undefined' || typeof LUIS_KEY === 'undefined') {
  console.log('PLEASE COPY .env.example to an .env file, and fill in the information')
}

// Create server
let server = restify.createServer()
server.listen(process.env.port || 3978, () => {
  console.log(`${server.name} listening to ${server.url}`)
})

// Create connector
const adapter = new BotFrameworkAdapter({ 
  appId: process.env.MICROSOFT_APP_ID, 
  appPassword: process.env.MICROSOFT_APP_PASSWORD 
})

server.post('/api/messages', adapter.listen())

// Initialize bot
const bot = new Bot(adapter)
    .use(new MemoryStorage())
    .use(new BotReduxMiddleware<State>(createStore))
    .use(new InquiryReduxMiddleware())

bot.onReceive(context => {
  if (context.request.type !== 'message') {
    return
  }
  const topic = infoTopic(context, getStore(context))
  return topic.then(() => {render(context, getStore<State>(context))})
  // defaultRenderer(context, getStore<State.All>(context))
})
