(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./inquiry/Inquiry", "./inquiry/inquiryReducer", "./InquiryReduxMiddleware", "./InquiryStateMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Inquiry_1 = require("./inquiry/Inquiry");
    exports.Inquiry = Inquiry_1.default;
    const inquiryReducer_1 = require("./inquiry/inquiryReducer");
    exports.InquiryReducer = inquiryReducer_1.default;
    const InquiryReduxMiddleware_1 = require("./InquiryReduxMiddleware");
    exports.InquiryReduxMiddleware = InquiryReduxMiddleware_1.default;
    const InquiryStateMiddleware_1 = require("./InquiryStateMiddleware");
    exports.InquiryStateMiddleware = InquiryStateMiddleware_1.default;
    const makeValidator = (validator, retryText) => ({
        validate: validator,
        retry: retryText
    });
    exports.makeValidator = makeValidator;
});
//# sourceMappingURL=index.js.map