(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./inquiry/reducers/data", "./inquiry/reducers/incomingMessage", "./inquiry/reducers/requesting", "./inquiry/reducers/responses", "./InquiryAbstractMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const data_1 = require("./inquiry/reducers/data");
    const incomingMessage_1 = require("./inquiry/reducers/incomingMessage");
    const requesting_1 = require("./inquiry/reducers/requesting");
    const responses_1 = require("./inquiry/reducers/responses");
    const InquiryAbstractMiddleware_1 = require("./InquiryAbstractMiddleware");
    function reducer(prevState, action) {
        const keys = Object.keys(prevState._inquiry);
        const newInquiryState = prevState._inquiry;
        const reducers = {
            incomingMessage: incomingMessage_1.default,
            requesting: requesting_1.default,
            responses: responses_1.default,
            data: data_1.default
        };
        keys.forEach((key) => {
            newInquiryState[key] = reducers[key](prevState._inquiry[key], action);
        });
        return Object.assign({}, prevState, { _inquiry: newInquiryState });
    }
    // const defaultGetStore = (context: BotContext) => context.reduxStore
    const stateUndefinedErrorMessage = 'context.state is undefined.  Please include the BotStateManager from botbuilder-core';
    const conversationUndefinedErrorMessage = 'context.state.conversation is undefined. Are you sure you included the BotStateManager correctly?';
    function defaultGetStateStore(context) {
        const getState = () => {
            if (!context.state) {
                throw new Error(stateUndefinedErrorMessage);
            }
            if (context.state.conversation === undefined) {
                throw new Error(conversationUndefinedErrorMessage);
            }
            if (context.state.conversation._inquiry === undefined) {
                const defaultInquiryState = {
                    incomingMessage: '',
                    requesting: null,
                    responses: [],
                    data: {}
                };
                context.state.conversation._inquiry = defaultInquiryState;
            }
            return context.state.conversation;
        };
        return {
            getState,
            dispatch: (action) => {
                const prevState = getState();
                if (context.state.conversation === undefined) {
                    throw new Error(conversationUndefinedErrorMessage);
                }
                context.state.conversation = reducer(prevState, action);
                return action;
            }
        };
    }
    class InquiryStateMiddleware extends InquiryAbstractMiddleware_1.default {
        constructor(getStore = defaultGetStateStore) {
            super(getStore);
        }
    }
    InquiryStateMiddleware.getStore = defaultGetStateStore;
    exports.default = InquiryStateMiddleware;
});
//# sourceMappingURL=InquiryStateMiddleware.js.map