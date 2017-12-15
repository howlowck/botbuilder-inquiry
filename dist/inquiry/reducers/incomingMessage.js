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
    exports.default = (prevState = '', action) => {
        if (action.type === '_INQUIRY_INCOMING_MESSAGE') {
            return action.data || null;
        }
        return prevState;
    };
});
//# sourceMappingURL=incomingMessage.js.map