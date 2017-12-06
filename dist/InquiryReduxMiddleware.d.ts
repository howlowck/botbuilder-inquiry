import { Store as ReduxStore } from 'redux';
import { InquiryInterface } from './inquiry/Inquiry';
import InquiryAbstractMiddleware from './InquiryAbstractMiddleware';
declare global  {
    interface BotContext {
        reduxStore: ReduxStore<any>;
    }
}
export default class InquiryReduxMiddleware<S extends InquiryInterface> extends InquiryAbstractMiddleware<S> {
    static getStore: (context: BotContext) => ReduxStore<any>;
    protected getStore: (context: BotContext) => ReduxStore<S>;
    constructor(getStore?: (context: BotContext) => ReduxStore<S>);
}
