(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "lodash"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const lodash_1 = require("lodash");
    /**
     * Inquiry is the class that encapsulates the store logic that manages your information gathering.
     *
     * @template T The State Object that should extend InquiryInterface
     */
    class Inquiry {
        constructor(convoName, store) {
            this.convoName = convoName;
            this.store = store;
        }
        static text(strings, ...keys) {
            // tagged template literal
            if (lodash_1.includes(keys, null) || lodash_1.includes(keys, undefined)) {
                return null;
            }
            const str = strings.reduce((prev, current, index) => {
                return prev + current + (keys[index] || ''); // keys will always have one less than strings
            }, '');
            return str;
        }
        static render(context, store) {
            store.getState()._inquiry.responses.forEach((value) => {
                context.reply(value);
            });
        }
        getRequestPath(type) {
            return `${this.convoName}.${type}`;
        }
        getValue(state, type, def) {
            return lodash_1.get(state, '_inquiry.data.' + this.getRequestPath(type), def);
        }
        ask(question, type, validators = [], transformer) {
            const { getState, dispatch } = this.store;
            const requestPath = this.getRequestPath(type);
            // if state is not requesting anything, asking the question
            if (!(getState()._inquiry.requesting)) {
                dispatch({ type: '_INQUIRY_SEND_TEXT', data: question });
                dispatch({ type: '_INQUIRY_ASK', data: requestPath });
                return null;
            }
            if (getState()._inquiry.requesting === requestPath) {
                let result = getState()._inquiry.incomingMessage;
                const failedValidator = validators.find((validator) => !validator.validate(result)); // run validations
                if (failedValidator) {
                    dispatch({ type: '_INQUIRY_SEND_TEXT', data: failedValidator.retry });
                    return null;
                }
                if (transformer) {
                    result = transformer(result);
                }
                dispatch({ type: '_INQUIRY_ANSWERED', requestPath: this.convoName + '.' + type, data: result });
                return this.getValue(getState(), type);
            }
            return this.getValue(getState(), type);
        }
        askAgain(question, type) {
            this.ask(question, type);
            this.delete(type);
        }
        hasValue(type) {
            const { getState } = this.store;
            return (typeof this.getValue(getState(), type)) !== 'undefined';
        }
        get(type, defaultValue) {
            const { getState } = this.store;
            const value = this.getValue(getState(), type);
            return typeof value === 'undefined' ? defaultValue : value;
        }
        set(type, value) {
            const { getState, dispatch } = this.store;
            dispatch({ type: '_INQUIRY_SET_VALUE', requestPath: this.convoName + '.' + type, data: value });
        }
        delete(type) {
            const { dispatch } = this.store;
            dispatch({ type: '_INQUIRY_DELETED', requestPath: this.convoName + '.' + type });
        }
        reply(message) {
            const { dispatch } = this.store;
            if (message) {
                dispatch({ type: '_INQUIRY_SEND_TEXT', data: message });
            }
        }
    }
    exports.default = Inquiry;
});
//# sourceMappingURL=Inquiry.js.map