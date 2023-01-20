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
exports.deleteVirtualCard = exports.unblockCard = exports.blockCard = exports.getTransactions = exports.getCards = exports.activateCard = exports.createVirtualCard = exports.createCard = void 0;
const CardService = __importStar(require("../services/cardService"));
async function createCard(req, res) {
    const apiKey = req.headers['x-api-key'];
    const id = Number(req.params.id);
    const { type } = req.body;
    await CardService.createCard(apiKey, id, type);
    return res.status(201).send({ message: "Card created!" });
}
exports.createCard = createCard;
async function createVirtualCard(req, res) {
    const id = Number(req.params.id);
    const { password } = req.body;
    await CardService.createVirtucalCard(id, password);
    return res.status(201).send({ message: "Virtual card created!" });
}
exports.createVirtualCard = createVirtualCard;
async function activateCard(req, res) {
    const { id, cvc, password } = req.body;
    await CardService.activateCard(id, cvc, password);
    return res.sendStatus(201);
}
exports.activateCard = activateCard;
async function getCards(req, res) {
    const { id, password } = req.body;
    const result = await CardService.getCards(id, password);
    return res.status(200).send({ cards: result });
}
exports.getCards = getCards;
async function getTransactions(req, res) {
    const id = Number(req.params.id);
    const result = await CardService.getTransactions(id);
    return res.status(200).send(result);
}
exports.getTransactions = getTransactions;
async function blockCard(req, res) {
    const id = Number(req.params.id);
    const { password } = req.body;
    await CardService.blockCard(id, password);
    return res.status(200).send({ message: "Card blocked!" });
}
exports.blockCard = blockCard;
async function unblockCard(req, res) {
    const id = Number(req.params.id);
    const { password } = req.body;
    await CardService.unblockCard(id, password);
    return res.status(200).send({ message: "Card unblocked!" });
}
exports.unblockCard = unblockCard;
async function deleteVirtualCard(req, res) {
    const id = Number(req.params.id);
    const { password } = req.body;
    await CardService.deleteVirtualCard(id, password);
    return res.status(200).send({ message: "Card deleted!" });
}
exports.deleteVirtualCard = deleteVirtualCard;
