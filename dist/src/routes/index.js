"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardRouter_1 = __importDefault(require("./cardRouter"));
const rechargeRouter_1 = __importDefault(require("./rechargeRouter"));
const paymentRouter_1 = __importDefault(require("./paymentRouter"));
const router = (0, express_1.Router)();
router.use(cardRouter_1.default);
router.use(rechargeRouter_1.default);
router.use(paymentRouter_1.default);
exports.default = router;
