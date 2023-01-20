"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCardPayment = void 0;
const cardErrorHandler_1 = require("./cardErrorHandler");
const cardUtils_1 = require("../utils/cardUtils");
const passwordUtils_1 = require("../utils/passwordUtils");
const cardService_1 = require("../services/cardService");
async function validateCardPayment(card, cvc, password, amount) {
    if (!card)
        throw (0, cardErrorHandler_1.handleError)(404, "Purchase failed, check your card informations and try again!");
    if (card.isBlocked)
        throw (0, cardErrorHandler_1.handleError)(401, "Purchase failed, card is blocked!");
    if ((0, cardUtils_1.expiredCard)(card.expirationDate))
        throw (0, cardErrorHandler_1.handleError)(401, "Purchase failed, card has expired!");
    if (cvc !== null) {
        if ((0, passwordUtils_1.decrypt)(card.securityCode) !== cvc)
            throw (0, cardErrorHandler_1.handleError)(401, "Purchase failed, wrong security code!");
    }
    if (password !== null) {
        if (card.password === '')
            throw (0, cardErrorHandler_1.handleError)(401, "Purchase failed, card wasn't activated!");
        if ((0, passwordUtils_1.decrypt)(card.password) !== password)
            throw (0, cardErrorHandler_1.handleError)(401, "Purchase failed, wrong password!");
    }
    let id = card.id;
    if (card.originalCardId !== null) {
        id = card.originalCardId;
    }
    const { balance } = await (0, cardService_1.getTransactions)(id);
    if (balance - amount < 0)
        throw (0, cardErrorHandler_1.handleError)(406, "Purchase failed, insufficient balance!");
}
exports.validateCardPayment = validateCardPayment;
