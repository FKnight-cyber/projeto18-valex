"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardController_1 = require("../controllers/cardController");
const cardSchema_1 = __importDefault(require("../schemas/cardSchema"));
const cardRouter = (0, express_1.Router)();
cardRouter.post('/create-card/:id', (0, cardSchema_1.default)(1), cardController_1.createCard);
cardRouter.post('/create-virtual-card/:id', (0, cardSchema_1.default)(4), cardController_1.createVirtualCard);
cardRouter.put('/activate-card', (0, cardSchema_1.default)(2), cardController_1.activateCard);
cardRouter.put('/mycard-block/:id', (0, cardSchema_1.default)(4), cardController_1.blockCard);
cardRouter.put('/mycard-unblock/:id', (0, cardSchema_1.default)(4), cardController_1.unblockCard);
cardRouter.get('/mycards', (0, cardSchema_1.default)(3), cardController_1.getCards);
cardRouter.get('/mycard-transactions/:id', cardController_1.getTransactions);
cardRouter.delete('/myvirtualcard/:id', (0, cardSchema_1.default)(4), cardController_1.deleteVirtualCard);
exports.default = cardRouter;
