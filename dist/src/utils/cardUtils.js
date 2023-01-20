"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillCardInfo = exports.format = exports.verifyPass = exports.generateDate = exports.cardName = exports.expiredCard = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
function expiredCard(date) {
    const currentDate = (0, dayjs_1.default)(Date.now(), 'dd/mm/yyyy').format('MM/YY');
    const months = Number(currentDate[0] + currentDate[1]);
    const years = Number(currentDate[3] + currentDate[4]);
    const cardMonths = Number(date[0] + date[1]);
    const cardYears = Number(date[3] + date[4]);
    if (years > cardYears)
        return true;
    if (months > cardMonths && years === cardYears)
        return true;
    return false;
}
exports.expiredCard = expiredCard;
function cardName(nome) {
    const nome2 = nome.split(' ');
    const nome3 = [];
    for (let i = 0; i < nome2.length; i++) {
        if (i === 0)
            nome3.push(nome2[i].toUpperCase());
        if (i !== 0 && i !== nome2.length - 1) {
            if (nome2[i].length >= 3) {
                nome3.push(nome2[i][0].toUpperCase());
            }
        }
        if (i === nome2.length - 1)
            nome3.push(nome2[i].toUpperCase());
    }
    return nome3.join(' ');
}
exports.cardName = cardName;
function generateDate() {
    const date = (0, dayjs_1.default)(Date.now(), 'dd/mm/yyyy').format('MM/YY');
    const expireDate = (Number(date[date.length - 2] + date[date.length - 1]) + 5).toString();
    return date.slice(0, -2) + expireDate;
}
exports.generateDate = generateDate;
function verifyPass(password) {
    const reg = new RegExp('^[0-9]{4}$');
    return reg.test(password);
}
exports.verifyPass = verifyPass;
function format(str) {
    return str.slice(0, 4) + '-' + str.slice(4, 8) + '-' + str.slice(8, 12) + '-' + str.slice(12, 16);
}
exports.format = format;
function fillCardInfo(employeeId, number, cardholderName, securityCode, expirationDate, password, isVirtual, originalCardId, isBlocked, type) {
    const cardData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password,
        isVirtual,
        originalCardId,
        isBlocked,
        type
    };
    return cardData;
}
exports.fillCardInfo = fillCardInfo;
