import { Request, Response } from "express";
import * as paymentService from "../services/paymentService"

export async function purchase(req:Request, res:Response){
    const posId:number  = Number(req.params.id);

    const { id,password,amount } : { id:number, password:string, amount:number } = req.body;

    await paymentService.purchase(posId, id, password, amount);

    return res.status(200).send({message: "Purchased!"});
}