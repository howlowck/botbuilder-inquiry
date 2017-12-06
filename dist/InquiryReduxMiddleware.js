(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./InquiryAbstractMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const InquiryAbstractMiddleware_1 = require("./InquiryAbstractMiddleware");
    const defaultGetStore = (context) => context.reduxStore;
    class InquiryReduxMiddleware extends InquiryAbstractMiddleware_1.default {
        constructor(getStore = defaultGetStore) {
            super(getStore);
        }
    }
    InquiryReduxMiddleware.getStore = defaultGetStore;
    exports.default = InquiryReduxMiddleware;
});
//# sourceMappingURL=InquiryReduxMiddleware.js.map