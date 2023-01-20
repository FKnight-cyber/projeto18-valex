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
exports.recharge = void 0;
const rechargeMethods = __importStar(require("../repositories/rechargeRepository"));
const companyRepository_1 = require("../repositories/companyRepository");
const cardErrorHandler_1 = require("../middlewares/cardErrorHandler");
const cardMethods = __importStar(require("../repositories/cardRepository"));
const cardUtils_1 = require("../utils/cardUtils");
async function recharge(apiKey, id, amount) {
    const checkApiKey = await (0, companyRepository_1.findByApiKey)(apiKey);
    if (!checkApiKey)
        throw (0, cardErrorHandler_1.handleError)(404, "Invalid API Key!");
    const card = await cardMethods.findById(id);
    if (!card)
        throw (0, cardErrorHandler_1.handleError)(404, "Card not registered!");
    if (card.isVirtual)
        throw (0, cardErrorHandler_1.handleError)(401, "Can't recharge virtual cards!");
    if (card.isBlocked)
        throw (0, cardErrorHandler_1.handleError)(401, "Can't recharge blocked card!");
    if ((0, cardUtils_1.expiredCard)(card.expirationDate))
        throw (0, cardErrorHandler_1.handleError)(401, "Expired card, can't recharge!");
    await rechargeMethods.insert(id, amount);
}
exports.recharge = recharge;
