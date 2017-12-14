import {Inquiry} from '../../../src'

const removeAlarmTopic = (context: BotContext, store: any) => {
  const removeAlarmInq = new Inquiry('removeAlarm', store)
  const name = removeAlarmInq.ask('What is the name of the alarm you want to remove?', 'name')
  if (name) {
    console.log('test')
    context.state.conversation.alarms = 
      context.state.conversation.alarms.filter(alarm => alarm.name !== name)
    context.reply(`ok your ${name} alarm is removed`)
    return true
  }
  return false
}

export default removeAlarmTopic