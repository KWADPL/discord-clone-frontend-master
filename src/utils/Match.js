"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchAny = void 0;
exports.MatchAny = Symbol('MatchAny');
var Match = function (valueToMatch) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    args.forEach(function (_a) {
        var value = _a[0], action = _a[1];
        if (value === valueToMatch || value === exports.MatchAny) {
            action();
            return;
        }
    });
    return undefined;
};
exports.default = Match;
