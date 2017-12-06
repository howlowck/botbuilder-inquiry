# Botbuilder Inquiry

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
      const store = getStore
      const infoConvo = new Inquiry('info', store)
      const name = infoConvo.ask('Hi, whats your name?', 'name')
      const email = infoConvo.ask('Whats your email?', 'email')
      const birthday = infoConvo.ask('Whats your birthday?', 'bd')
      convo.reply(text`Nice! now I have your name ${name}, Email: ${email}, Birthday: ${birthday}`)
      render(context, getStore(context))
    })
```

## APIs

