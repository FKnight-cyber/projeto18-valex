import { Request, Response, NextFunction } from "express";

export default async function cardErrorHandler(error:any,req:Request,res:Response,next:NextFunction) {
    if (error.type === "error_not_found") return res.status(401).send(error.message);
    if (error.type === "error_already_registered") return res.status(409).send(error.message);
    next();
}