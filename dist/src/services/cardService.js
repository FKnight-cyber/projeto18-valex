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
exports.deleteVirtualCard = exports.unblockCard = exports.blockCard = exports.getTransactions = exports.getCards = exports.activateCard = exports.createVirtucalCard = exports.createCard = void 0;
const companyRepository_1 = require("../repositories/companyRepository");
const cardMethods = __importStar(require("../repositories/cardRepository"));
const employeeMethods = __importStar(require("../repositories/employeeRepository"));
const paymentMethods = __importStar(require("../repositories/paymentRepository"));
const rechargeMethods = __importStar(require("../repositories/rechargeRepository"));
const faker_1 = require("@faker-js/faker");
const cardErrorHandler_1 = require("../middlewares/cardErrorHandler");
const cardUtils_1 = require("../utils/cardUtils");
const passwordUtils_1 = require("../utils/passwordUtils");
async function createCard(apiKey, employeeId, type) {
    const checkApiKey = await (0, companyRepository_1.findByApiKey)(apiKey);
    if (!checkApiKey)
        throw (0, cardErrorHandler_1.handleError)(404, "Invalid API Key!");
    const checkEmployee = await employeeMethods.findById(employeeId);
    if (!checkEmployee)
        throw (0, cardErrorHandler_1.handleError)(404, "Employee not registered!");
    const checkCards = await cardMethods.findByTypeAndEmployeeId(type, employeeId);
    if (checkCards)
        throw (0, cardErrorHandler_1.handleError)(409, `The employee already have a ${type} card type`);
    const cardholderName = (0, cardUtils_1.cardName)(checkEmployee.fullName);
    const number = faker_1.faker.finance.creditCardNumber('####-####-####-###L');
    const expirationDate = (0, cardUtils_1.generateDate)();
    const CVC = faker_1.faker.finance.creditCardCVV();
    const securityCode = (0, passwordUtils_1.encrypt)(CVC);
    const password = '';
    const isVirtual = false;
    const originalCardId = null;
    const isBlocked = true;
    const cardData = (0, cardUtils_1.fillCardInfo)(employeeId, number, cardholderName, securityCode, expirationDate, password, isVirtual, originalCardId, isBlocked, type);
    await cardMethods.insert(cardData);
}
exports.createCard = createCard;
async function createVirtucalCard(id, password) {
    const card = await cardMethods.findById(id);
    if (!card)
        throw (0, cardErrorHandler_1.handleError)(404, `Card not registered!`);
    if ((0, cardUtils_1.expiredCard)(card.expirationDate))
        throw (0, cardErrorHandler_1.handleError)(401, "This card has expired!");
    if (!(0, cardUtils_1.verifyPass)(password))
        throw (0, cardErrorHandler_1.handleError)(422, "Password must be only numbers!");
    if ((0, passwordUtils_1.decrypt)(card.password) !== password)
        throw (0, cardErrorHandler_1.handleError)(401, "Wrong password!");
    const cardholderName = card.cardholderName;
    const number = faker_1.faker.finance.creditCardNumber('mastercard');
    const expirationDate = (0, cardUtils_1.generateDate)();
    const CVC = faker_1.faker.finance.creditCardCVV();
    const securityCode = (0, passwordUtils_1.encrypt)(CVC);
    const isVirtual = true;
    const originalCardId = id;
    const isBlocked = false;
    const cardData = (0, cardUtils_1.fillCardInfo)(card.employeeId, number, cardholderName, securityCode, expirationDate, card.password, isVirtual, originalCardId, isBlocked, card.type);
    await cardMethods.insert(cardData);
}
exports.createVirtucalCard = createVirtucalCard;
async function activateCard(id, cvc, password) {
    const card = await cardMethods.findById(id);
    if (!card)
        throw (0, cardErrorHandler_1.handleError)(404, `Card not registered!`);
    if (card.isVirtual)
        throw (0, cardErrorHandler_1.handleError)(401, `Can't activate virtual cards!`);
    if ((0, passwordUtils_1.decrypt)(card.securityCode) !== cvc)
        throw (0, cardErrorHandler_1.handleError)(401, "Wrong CVC!");
    if ((0, cardUtils_1.expiredCard)(card.expirationDate))
        throw (0, cardErrorHandler_1.handleError)(401, "This card has expired!");
    if (card.password)
        throw (0, cardErrorHandler_1.handleError)(409, "This card is active!");
    if (!(0, cardUtils_1.verifyPass)(password))
        throw (0, cardErrorHandler_1.handleError)(401, "Wrong password!");
    const encryptedPass = (0, passwordUtils_1.encrypt)(password);
    await cardMethods.update(id, encryptedPass);
}
exports.activateCard = activateCard;
async function getCards(id, password) {
    const result = [];
    const { rows: card } = await cardMethods.findByEmployeeId(id);
    if (card.length === 0)
        throw (0, cardErrorHandler_1.handleError)(404, "This user doesn't have registered cards!");
    for (let i = 0; i < card.length; i++) {
        if (password.includes((0, passwordUtils_1.decrypt)(card[i].password))) {
            delete card[i].password;
            card[i].securityCode = (0, passwordUtils_1.decrypt)(card[i].securityCode);
            result.push(card[i]);
        }
    }
    return result;
}
exports.getCards = getCards;
async function getTransactions(id) {
    const card = await cardMethods.findById(id);
    if (!card)
        throw (0, cardErrorHandler_1.handleError)(404, `Card not registered!`);
    const recharges = await rechargeMethods.findByCardId(id);
    if (recharges.length === 0) {
        return {
            balance: 0,
            recharges: "No recharges were made!"
        };
    }
    let balance = 0;
    recharges.forEach(element => {
        balance += element.amount;
    });
    const payments = await paymentMethods.findByCardId(id);
    if (payments.length === 0) {
        return {
            balance,
            recharges: recharges,
            transactions: "No payments were made!"
        };
    }
    payments.forEach(element => {
        balance -= element.amount;
    });
    const result = {
        balance,
        recharges: recharges,
        transactions: payments
    };
    return result;
}
exports.getTransactions = getTransactions;
async function blockCard(id, password) {
    const card = await cardMethods.findById(id);
    if (!card)
        throw (0, cardErrorHandler_1.handleError)(404, "Card not registered!");
    if (card.password === '')
        throw (0, cardErrorHandler_1.handleError)(401, "Card wasn't activated!");
    if ((0, passwordUtils_1.decrypt)(card.password) !== password)
        throw (0, cardErrorHandler_1.handleError)(401, "Wrong password!");
    if (card.isBlocked)
        throw (0, cardErrorHandler_1.handleError)(409, "Card already blocked!");
    if ((0, cardUtils_1.expiredCard)(card.expirationDate))
        throw (0, cardErrorHandler_1.handleError)(401, "This card has expired!");
    await cardMethods.blockCard(id);
}
exports.blockCard = blockCard;
async function unblockCard(id, password) {
    const card = await cardMethods.findById(id);
    if (!card)
        throw (0, cardErrorHandler_1.handleError)(404, "Card not registered!");
    if (card.password === '')
        throw (0, cardErrorHandler_1.handleError)(401, "Card wasn't activated!");
    if ((0, passwordUtils_1.decrypt)(card.password) !== password)
        throw (0, cardErrorHandler_1.handleError)(401, "Wrong Password!");
    if (!card.isBlocked)
        throw (0, cardErrorHandler_1.handleError)(409, "Card is already active!");
    if ((0, cardUtils_1.expiredCard)(card.expirationDate))
        throw (0, cardErrorHandler_1.handleError)(401, "This card has expired!");
    await cardMethods.unblockCard(id);
}
exports.unblockCard = unblockCard;
async function deleteVirtualCard(id, password) {
    const virtualCard = await cardMethods.findById(id);
    if (!virtualCard)
        throw (0, cardErrorHandler_1.handleError)(404, "Card not registered!");
    if (virtualCard.originalCardId === null)
        throw (0, cardErrorHandler_1.handleError)(401, "Can't delete physical cards!");
    if ((0, passwordUtils_1.decrypt)(virtualCard.password) !== password)
        throw (0, cardErrorHandler_1.handleError)(401, "Wrong Password!");
    await cardMethods.remove(id);
}
exports.deleteVirtualCard = deleteVirtualCard;
