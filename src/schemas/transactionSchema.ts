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
    }
}

export default transactionValidation;