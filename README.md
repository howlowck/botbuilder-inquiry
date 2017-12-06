# Botbuilder Inquiry ![groundhog-mascot](./assets/inquiry-groundhog.png)

## Design Philosophy

This Botbuilder Inquiry package is built on top of `botbuilder-redux`.  It uses the powerful Redux store to manage its state.  Inquiry hides the implementation details of inspecting the state while making your conversation easy to understand.

* Thin API
* Flexible
* Functional

## Getting Started

**`npm install --save botbuilder-inquiry`**

You can use `Inquiry` with either the `BotReduxMiddleware` in `botbuilder-redux` or `BotStateManager` in `botbuilder-core`.

Depending on either you use Redux or State Manager, you will use `InquiryReduxMiddleware` or `InquiryStateMiddleware`, respectively.

```js
import {InquiryStateManager, Inquiry} from 'botbuilder-inquiry'
import {Bot, BotStateManager, MemoryStorage} from 'botbuilder-core'

const {render, text} = Inquiry //some static helper functions
const {getStore} = InquiryStateMiddleware //get the store

const bot = new Bot(adapter)
    .use(new MemoryStorage())
    .use(new BotStateManager())
    .use(new InquiryStateMiddleware())
    .onReceive((context) => {
      const store = getStore(context)
      const infoConvo = new Inquiry('info', store)
      const name = infoConvo.ask('Hi, whats your name?', 'name')   
      //null      -> "Hao"     -> "Hao"         -> "Hao"
      const email = infoConvo.ask('Whats your email?', 'email')    
      //undefined -> null      -> "haolu@m.com" -> "haolu@m.com"
      const birthday = infoConvo.ask('Whats your birthday?', 'bd') 
      //undefined -> undefined -> null          -> "2/29/88"
      convo.reply(text`Nice! now I have your name ${name}, Email: ${email}, Birthday: ${birthday}`)
      //Only replies when all are returned
      render(context, getStore(context))
    })
```
## API
### `Inquiry`
Inquiry is the class that incapsulates the information you want to gather.

#### Instantiating
Syntax: `new Inquiry(name: string, store: StateStore)`
* `name`: The name of the domain that you want to gather.  use camelCase please.
* `store`: The store is either the ReduxStore you created or the store that internal store created by StateManager

#### `ask` method
Syntax: `inquiry.ask(question: string, name: string, validators?: Validator[], transformer?: (incomingMessage) => any)`
Returns: `string | null | undefined`
* `question`: This is just a question you ask your user
* `name`: the name of the answer
* `validators`: an array of `Validator` see below of that it looks like
* `transformer`: a pure function that takes in the user message (answer) and transform it to what every you want, this will be returned from the `ask` method.

#### `reply` method
Syntax: `inquiry.reply(message: string | null)`
Returns: `void`
* `message`: This is what you want to say to the user.  reply will not say anything if the message is `null`.  There is a `text` helper function that helps you with your answers.  Take a look below.

### Helper Functions from `Inquiry`
#### `render`
the render function will be take in your store and send the messages to the user for you.

#### `text`
This is a tagged template function.  If any variable you pass in are not truthy, then the string will be null.
Syntax: ``inquiry.reply(text`my name is ${name}.`)``

### Helper Function from `Inquiry{State|Redux}Middleware`
#### `getStore`
The store is the magic (not really) thing that keeps your state as well as mutation.  If you are using Redux, it is the Redux Store that you create with `BotReduxMiddleware`.  If you are using the BotStateManager, the Store is a slimed down version that is created by the `InquiryStateMiddleware` itself.

----------------------------------------------------

## What's up with the Groundhog?

The implementation of Inquiry is that every `ask` function runs on EVERY turn (that's not in a conditional statement).  This is reminiscient of the movie Groundhog Day where Bill Murray has to relive the same day over and over, but maintains his memory.  That is pretty much what `ask` is doing.

