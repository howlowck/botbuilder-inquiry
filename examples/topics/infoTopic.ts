import {Inquiry, makeValidator, InquiryInterface} from '../../src'
import { isAlpha, isEmail, isDate } from 'validator'

const {text} = Inquiry

const characterValidator = makeValidator(isAlpha, 'Please put Characters')
const emailValidator = makeValidator(isEmail, 'Email Only please!')

const infoTopic = (context: BotContext, store: any) => {
  const convo = new Inquiry('info', store)
  const name = convo.ask('Hi, whats your name?', 'name', [characterValidator])
  const email = convo.ask('Whats your email?', 'email', [emailValidator])
  const confirmEmail = convo.ask(`Is this ${email} what you want?`, 'confirmEmail', [], (message) => message === 'yes')
  if (confirmEmail === false) {
    convo.askAgain('Ok. What is your email??', 'email')
  }
  const birthday = convo.ask('Whats your birthday?', 'bd')
  convo.reply(text`Nice! now I have your name ${name}, Email: ${email}, Birthday: ${birthday}`)
  return Promise.resolve({name, email, birthday})
}
export default infoTopic