"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const transactionValidation = (code) => {
    return async function cardValidation(req, res, next) {
        if (code === 1) {
            const transactionSchema = joi_1.default.object({
                id: joi_1.default.number().min(1).required(),
                password: joi_1.default.string().min(4).max(4).required(),
                amount: joi_1.default.number().min(1).required()
            });
            const { error } = transactionSchema.validate(req.body, { abortEarly: false });
            if (error)
                return res.status(422).send(error.details.map(detail => detail.message));
            next();
        }
        if (code === 2) {
            const transactionSchema = joi_1.default.object({
                amount: joi_1.default.number().min(1).required()
            });
            const { error } = transactionSchema.validate(req.body);
            if (error)
                return res.status(422).send(error.details.map(detail => detail.message));
            next();
        }
        if (code === 3) {
            const transactionSchema = joi_1.default.object({
                number: joi_1.default.string().min(16).max(16).required(),
                name: joi_1.default.string().required(),
                expirationDate: joi_1.default.string().min(5).max(5).required(),
                cvc: joi_1.default.string().min(3).max(3).required(),
                amount: joi_1.default.number().min(1).required()
            });
            const { error } = transactionSchema.validate(req.body, { abortEarly: false });
            if (error)
                return res.status(422).send(error.details.map(detail => detail.message));
            next();
        }
    };
};
exports.default = transactionValidation;
