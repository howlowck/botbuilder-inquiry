(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InquiryMiddleware {
        constructor(getStore) {
            this.getStore = getStore;
        }
        contextCreated(context) {
            const store = this.getStore(context);
            store.dispatch({ type: '_INQUIRY_CLEAR_RESPONSES' });
            store.dispatch({ type: '_INQUIRY_INCOMING_MESSAGE', data: context.request.text });
        }
    }
    exports.default = InquiryMiddleware;
});
//# sourceMappingURL=InquiryAbstractMiddleware.js.map