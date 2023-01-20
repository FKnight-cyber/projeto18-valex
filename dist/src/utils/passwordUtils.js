"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const cryptr = new cryptr_1.default('myTotallySecretKey');
function encrypt(password) {
    return cryptr.encrypt(password);
}
exports.encrypt = encrypt;
function decrypt(password) {
    return cryptr.decrypt(password);
}
exports.decrypt = decrypt;
