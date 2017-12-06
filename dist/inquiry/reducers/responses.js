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
    exports.default = (prevState = [], action) => {
        if (action.type === '_INQUIRY_SEND_TEXT') {
            return [...prevState, action.data];
        }
        if (action.type === '_INQUIRY_CLEAR_RESPONSES') {
            return [];
        }
        return prevState;
    };
});
//# sourceMappingURL=responses.js.map