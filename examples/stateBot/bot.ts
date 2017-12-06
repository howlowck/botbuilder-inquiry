require('dotenv').config({path: 'examples/assistantBot/.env'})
import { Bot, MemoryStorage, BotStateManager } from 'botbuilder-core'
import { BotFrameworkAdapter } from 'botbuilder-services'
import { get, includes } from 'lodash'
import infoTopic from '../topics/infoTopic'
import {
  Inquiry,
  InquiryStateMiddleware,
} from '../../src'
const restify = require('restify')

const {getStore} = InquiryStateMiddleware
const {render} = Inquiry

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
    .use(new BotStateManager())
    .use(new InquiryStateMiddleware())

bot.onReceive(context => {
  if (context.request.type !== 'message') {
    return
  }
  const topicResults = infoTopic(context, getStore(context)) // [name, email, birthday]

  render(context, getStore(context))
  // return topic.then(({name, email, birthday}) => {
  //   render(context, getStore(context))
  // })
})
