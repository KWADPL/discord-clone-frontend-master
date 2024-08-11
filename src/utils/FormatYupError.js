"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatYupError = function (error) { return error.inner.map(function (e) { return ({
    path: e.path || '',
    message: e.message,
}); }); };
exports.default = formatYupError;
