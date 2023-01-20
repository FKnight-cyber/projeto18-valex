"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const cardValidation = (code) => {
    return async function cardValidation(req, res, next) {
        if (code === 1) {
            const cardSchema = joi_1.default.object({
                type: joi_1.default.string()
                    .valid('groceries', 'restaurants', 'transport', 'education', 'health')
                    .required()
            });
            const { error } = cardSchema.validate(req.body);
            if (error)
                return res.status(422).send(error.details.map(detail => detail.message));
            next();
        }
        if (code === 2) {
            const cardSchema = joi_1.default.object({
                id: joi_1.default.number().min(1).required(),
                cvc: joi_1.default.string().min(3).max(3).required(),
                password: joi_1.default.string().min(4).max(4).required()
            });
            const { error } = cardSchema.validate(req.body, { abortEarly: false });
            if (error)
                return res.status(422).send(error.details.map(detail => detail.message));
            next();
        }
        if (code === 3) {
            const cardSchema = joi_1.default.object({
                id: joi_1.default.number().min(1).required(),
                password: joi_1.default.array().min(1).required()
            });
            const { error } = cardSchema.validate(req.body, { abortEarly: false });
            if (error)
                return res.status(422).send(error.details.map(detail => detail.message));
            next();
        }
        if (code === 4) {
            const cardSchema = joi_1.default.object({
                password: joi_1.default.string().min(4).max(4).required()
            });
            const { error } = cardSchema.validate(req.body);
            if (error)
                return res.status(422).send(error.details.map(detail => detail.message));
            next();
        }
    };
};
exports.default = cardValidation;
