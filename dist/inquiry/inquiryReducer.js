(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "redux", "./reducers/incomingMessage", "./reducers/requesting", "./reducers/responses", "./reducers/data"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const redux_1 = require("redux");
    const incomingMessage_1 = require("./reducers/incomingMessage");
    const requesting_1 = require("./reducers/requesting");
    const responses_1 = require("./reducers/responses");
    const data_1 = require("./reducers/data");
    exports.default = redux_1.combineReducers({
        incomingMessage: incomingMessage_1.default,
        requesting: requesting_1.default,
        responses: responses_1.default,
        data: data_1.default
    });
});
//# sourceMappingURL=inquiryReducer.js.map