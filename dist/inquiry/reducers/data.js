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
    exports.default = (prevState = {}, action) => {
        if (action.type === '_INQUIRY_ANSWERED') {
            const requestPath = action.requestPath;
            return Object.assign({}, lodash_1.set(prevState, requestPath, action.data));
        }
        if (action.type === '_INQUIRY_SET_VALUE') {
            const requestPath = action.requestPath;
            return Object.assign({}, lodash_1.set(prevState, requestPath, action.data));
        }
        if (action.type === '_INQUIRY_DELETED') {
            const { requestPath } = action;
            return Object.assign({}, lodash_1.omit(prevState, [requestPath]));
        }
        return prevState;
    };
});
//# sourceMappingURL=data.js.map