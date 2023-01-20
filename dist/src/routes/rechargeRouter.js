"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rechargeController_1 = require("../controllers/rechargeController");
const transactionSchema_1 = __importDefault(require("../schemas/transactionSchema"));
const rechargeRouter = (0, express_1.Router)();
rechargeRouter.post('/recharge-card/:id', (0, transactionSchema_1.default)(2), rechargeController_1.recharge);
exports.default = rechargeRouter;
