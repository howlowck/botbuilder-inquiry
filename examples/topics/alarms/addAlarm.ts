import {Inquiry} from '../../../src'

const addAlarmTopic = (context: BotContext, store: any) => {
  const addAlarmInq = new Inquiry('addingAlarm', store)
  const name = addAlarmInq.ask('What is the name of your alarm?', 'name')
  const time = addAlarmInq.ask('what time do you want to set?', 'time')
  if (name && time) {
    const alarms = context.state.conversation.alarms || []
    alarms.push({name, time})
    context.state.conversation.alarms = alarms
    context.reply(`ok your ${name} alarm is added`)
    return true
  }
  return false
}

export default addAlarmTopic