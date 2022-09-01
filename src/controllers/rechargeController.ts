import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService";

declare module 'http' {
    interface IncomingHttpHeaders {
        "x-api-key"?: string
    }
}

export async function recharge(req:Request, res:Response){
    const apiKey:any = req.headers['x-api-key'];
    const id:number = Number(req.params.id);
    const { amount } : { amount:number } =  req.body;

    await rechargeService.recharge(apiKey, id, amount);

    return res.status(200).send({message: "Recharged!"})
}