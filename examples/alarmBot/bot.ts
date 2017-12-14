require('dotenv').config({path: 'examples/assistantBot/.env'})
import { Bot, MemoryStorage, BotStateManager } from 'botbuilder-core'
import { BotFrameworkAdapter } from 'botbuilder-services'
import { get, includes } from 'lodash'
import addAlarmTopic from '../topics/alarms/addAlarm'
import removeAlarmTopic from '../topics/alarms/removeAlarm'
import listAlarmTopic from '../topics/alarms/listAlarm'

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

const topicMap = {
  addAlarmTopic,
  removeAlarmTopic,
  listAlarmTopic
}

bot.onReceive(context => {
  if (context.request.type !== 'message') {
    return
  }
  try {
    if (context.state.conversation.currentTopic) {
      const topicName = context.state.conversation.currentTopic
      const completed = topicMap[topicName](context, getStore(context))
      if (completed) {
        context.state.conversation.currentTopic = null
      }
    }

    if (context.request.text === 'add alarm') {
      context.state.conversation.currentTopic = 'addAlarmTopic'
      const completed = addAlarmTopic(context, getStore(context))
      if (completed) {
        context.state.conversation.currentTopic = null
      }
    } else if (context.request.text === 'remove alarm') {
      context.state.conversation.currentTopic = 'removeAlarmTopic'
      const completed = removeAlarmTopic(context, getStore(context))
      if (completed) {
        context.state.conversation.currentTopic = null
      }
    } else if (context.request.text === 'list alarm') {
      context.state.conversation.listAlarmTopic = 'listAlarmTopic'
      const completed = listAlarmTopic(context, getStore(context))
      if (completed) {
        context.state.conversation.currentTopic = null
      }
    }
  } catch (error) {
    console.error(error)
  }
  render(context, getStore(context))
})
