import { Request, Response, NextFunction } from "express";
import joi from "joi";

const transactionValidation = (code:number) => {
    return async function cardValidation(req:Request, res:Response, next:NextFunction) {
        if(code === 1){
            const transactionSchema = joi.object({
                id: joi.number().min(1).required(),
                password: joi.string().min(4).max(4).required(),
                amount: joi.number().min(1).required()
            });

            const { error } = transactionSchema.validate(req.body,{ abortEarly:false });

            if(error) return res.status(422).send(error.details.map(detail => detail.message));

            next();
        }

        if(code === 2){
            const transactionSchema = joi.object({
                amount: joi.number().min(1).required()
            });

            const { error } = transactionSchema.validate(req.body);

            if(error) return res.status(422).send(error.details.map(detail => detail.message));

            next();
        }

        if(code === 3){
            const transactionSchema = joi.object({
                number: joi.string().min(16).max(16).required(),
                name: joi.string().required(),
                expirationDate: joi.string().min(5).max(5).required(),
                cvc: joi.string().min(3).max(3).required(),
                amount: joi.number().min(1).required()
            });

            const { error } = transactionSchema.validate(req.body,{abortEarly:false});

            if(error) return res.status(422).send(error.details.map(detail => detail.message));

            next();
        }
    }
}

export default transactionValidation;