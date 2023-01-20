"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const transactionSchema_1 = __importDefault(require("../schemas/transactionSchema"));
const paymentRouter = (0, express_1.Router)();
paymentRouter.post('/buy-store/:id', (0, transactionSchema_1.default)(1), paymentController_1.purchase);
paymentRouter.post('/buy-online/:id', (0, transactionSchema_1.default)(3), paymentController_1.purchaseOnline);
exports.default = paymentRouter;
