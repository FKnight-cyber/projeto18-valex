"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
function handleError(type, entity) {
    return {
        type,
        message: `${entity}`
    };
}
exports.handleError = handleError;
async function errorHandler(error, req, res, next) {
    return res.status(error.type).send(error.message);
}
exports.default = errorHandler;
