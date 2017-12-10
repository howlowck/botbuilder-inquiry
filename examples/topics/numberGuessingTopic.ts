import {Inquiry, makeValidator, InquiryInterface} from '../../src'
import { isAlpha, isEmail, isNumeric } from 'validator'

const {text} = Inquiry

const numberValidator = makeValidator(isNumeric, 'Please guess a number!')

const guessingGameTopic = (context: BotContext, store: any) => {
  const convo = new Inquiry('numberGame', store)
  
  if (!convo.hasValue('target')) {
    convo.set('target', Math.ceil(Math.random() * 100))
  }
  if (!convo.hasValue('turnsLeft')) {
    convo.set('turnsLeft', 11)
  }
  
  const turnsLeft = convo.get('turnsLeft') - 1
  const target: number = convo.get('target')
  let guess: number = convo.ask(`Guess a number, you have ${turnsLeft} turns`, 
  'guess', [numberValidator], (result) => +result)

  if (convo.hasValue('guess')) {
    if (guess === target) {
      convo.reply('You won!')
      return
    }

    if (turnsLeft === 0) {
      convo.reply(`You ran out of turns!`)
      return
    }
  
    if (guess < target) {
      convo.askAgain(`Too small! Guess larger, you have ${turnsLeft} turns`, 'guess')
    }
  
    if (guess > target) {
      convo.askAgain(`Too large! Guess smaller, you have ${turnsLeft} turns`, 'guess')
    }
  }

  convo.set('turnsLeft', turnsLeft)

}
export default guessingGameTopic