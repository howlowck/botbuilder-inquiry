import { InquiryInterface } from './inquiry/Inquiry';
import { Action } from './inquiry/InquiryActions';
import InquiryAbstractMiddleware from './InquiryAbstractMiddleware';
export interface Dispatch<S> {
    <A extends Action>(action: A): A;
}
export interface StateStore<T> {
    getState: () => T;
    dispatch: Dispatch<T>;
}
export default class InquiryStateMiddleware<S extends InquiryInterface> extends InquiryAbstractMiddleware<S> {
    static getStore: (context: BotContext) => StateStore<InquiryInterface>;
    protected getStore: (context: BotContext) => StateStore<S>;
    constructor(getStore?: (context: BotContext) => StateStore<S>);
}
