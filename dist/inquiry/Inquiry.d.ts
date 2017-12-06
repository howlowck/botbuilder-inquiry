import { Store as ReduxStore } from 'redux';
import { StoreItem } from 'botbuilder-core';
import { StateStore } from '../InquiryStateMiddleware';
export interface InquiryState {
    [key: string]: any;
    incomingMessage: string | null;
    responses: string[];
    requesting: string | null;
    data: {
        [key: string]: any;
    };
}
export interface InquiryInterface extends StoreItem {
    _inquiry: InquiryState;
}
export declare type Transformer = (incomingMessage: string) => string;
export declare type Validator = {
    validate: (incomingMessage: string) => boolean;
    retry?: string;
};
/**
 * Inquiry is the class that encapsulates the store logic that manages your information gathering.
 *
 * @template T The State Object that should extend InquiryInterface
 */
export default class Inquiry<T extends InquiryInterface> {
    /**
     *
     */
    protected convoName: string;
    protected store: ReduxStore<T> | StateStore<T>;
    static text(strings: TemplateStringsArray, ...keys: Array<string | null>): string | null;
    static render(context: BotContext, store: ReduxStore<InquiryInterface> | StateStore<InquiryInterface>): void;
    constructor(convoName: string, store: ReduxStore<T> | StateStore<T>);
    protected getRequestPath(type: string): string;
    protected getValue(state: T, type: string): T[string];
    ask(message: string, type: string, validators?: Validator[], transformer?: Transformer): null | string | undefined;
    reply(message: string | null): void;
}
