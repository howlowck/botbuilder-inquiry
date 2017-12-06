import {Inquiry} from '../../src'

const bookFlightTopic = async (context: BotContext, store: any) => {
  const convo = new Inquiry('flight', store)
  const dest = convo.ask('Where would you like to go?', 'flight.destination')
  const depart = convo.ask('When would you depart?', 'flight.departDate')
  const ret = convo.ask('When would you return?', 'flight.returnDate')
  if (dest && depart && ret) {
    // Book the flight
    const confirmationObj = await fetch('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1')
      .then(res => res.json())
    const confirmationText = confirmationObj[0]
    convo.reply(`Ok! Your flight is booked!`)
    convo.reply(`Your bacon-loving agent says: ${confirmationText}`)
  }
}

export default bookFlightTopic