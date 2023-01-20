"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStore = void 0;
const cardErrorHandler_1 = require("./cardErrorHandler");
async function validateStore(store, card) {
    if (!store)
        throw (0, cardErrorHandler_1.handleError)(404, "Purchase failed, store not registered!");
    if (store.type !== card.type)
        throw (0, cardErrorHandler_1.handleError)(409, "Purchase failed, this store doesn't accept this type of card!");
}
exports.validateStore = validateStore;
