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
const paymentService = __importStar(require("../services/paymentService"));
async function purchase(req, res) {
    const posId = Number(req.params.id);
    const { id, password, amount } = req.body;
    await paymentService.purchase(posId, id, password, amount);
    return res.status(200).send({ message: "Purchased!" });
}
exports.purchase = purchase;
async function purchaseOnline(req, res) {
    const posId = Number(req.params.id);
    const { number, name, expirationDate, cvc, amount } = req.body;
    await paymentService.purchaseOnline(posId, number, name, expirationDate, cvc, amount);
    return res.status(200).send({ message: "Purchased!" });
}
exports.purchaseOnline = purchaseOnline;
