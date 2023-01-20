"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseOnline = exports.purchase = void 0;
const paymentMethods = __importStar(require("../repositories/paymentRepository"));
const cardMethods = __importStar(require("../repositories/cardRepository"));
const businessMethods = __importStar(require("../repositories/businessRepository"));
const cardUtils_1 = require("../utils/cardUtils");
const validateCard_1 = require("../middlewares/validateCard");
const validateStore_1 = require("../middlewares/validateStore");
const cardErrorHandler_1 = require("../middlewares/cardErrorHandler");
async function purchase(posId, id, password, amount) {
    const card = await cardMethods.findById(id);
    if (card.isVirtual)
        throw (0, cardErrorHandler_1.handleError)(401, "Can't use virtual cards to buy in POS!");
    await (0, validateCard_1.validateCardPayment)(card, null, password, amount);
    const store = await businessMethods.findById(posId);
    await (0, validateStore_1.validateStore)(store, card);
    await paymentMethods.insert(id, posId, amount);
}
exports.purchase = purchase;
async function purchaseOnline(posId, number, name, expirationDate, cvc, amount) {
    const formatedNumber = (0, cardUtils_1.format)(number);
    const card = await cardMethods.findByCardDetails(formatedNumber, name, expirationDate);
    await (0, validateCard_1.validateCardPayment)(card, cvc, null, amount);
    const store = await businessMethods.findById(posId);
    await (0, validateStore_1.validateStore)(store, card);
    await paymentMethods.insert(card.originalCardId, posId, amount);
}
exports.purchaseOnline = purchaseOnline;
