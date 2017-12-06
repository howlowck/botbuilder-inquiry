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
    exports.default = (prevState = null, action) => {
        if (action.type === '_INQUIRY_ANSWERED' && prevState !== null) {
            return '';
        }
        if (action.type === '_INQUIRY_ASK' && !prevState) {
            return action.data;
        }
        return prevState;
    };
});
//# sourceMappingURL=requesting.js.map