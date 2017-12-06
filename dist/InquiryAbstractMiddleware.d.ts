import { Middleware } from 'botbuilder-core';
import { Store as ReduxStore } from 'redux';
import { InquiryInterface } from './inquiry/Inquiry';
import { StateStore } from './InquiryStateMiddleware';
declare global  {
    interface BotContext {
        reduxStore: ReduxStore<any>;
    }
}
export default abstract class InquiryMiddleware<S extends InquiryInterface> implements Middleware {
    protected getStore: (context: BotContext) => ReduxStore<S> | StateStore<S>;
    constructor(getStore: (context: BotContext) => ReduxStore<S> | StateStore<S>);
    contextCreated(context: BotContext): void;
}
