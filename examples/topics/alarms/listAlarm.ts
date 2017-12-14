import {Inquiry} from '../../../src'
import {MessageStyler, CardStyler} from 'botbuilder-core'

const listAlarmTopic = (context: BotContext, store: any) => {
  const alarms = context.state.conversation.alarms || []
  const alarmCards = alarms.map((alarm) => CardStyler.thumbnailCard(alarm.name + ' ' + alarm.time))
  context.reply(MessageStyler.list(alarmCards))
  return true
}

export default listAlarmTopic