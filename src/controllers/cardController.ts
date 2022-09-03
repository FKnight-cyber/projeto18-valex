import { Request, Response } from "express";
import * as CardService from "../services/cardService";

declare module 'http' {
    interface IncomingHttpHeaders {
        "x-api-key"?: string
    }
}

export async function createCard(req:Request,res:Response) {
    const apiKey = req.headers['x-api-key'];
    const id:number = Number(req.params.id);
    const { type } = req.body;

    await CardService.createCard(apiKey,id,type);

    return res.status(201).send({message: "Card created!"});
}

export async function createVirtualCard(req:Request,res:Response){
    const id:number = Number(req.params.id);
    const { password } : { password:string } = req.body;

    await CardService.createVirtucalCard(id,password);

    return res.status(201).send({message: "Virtual card created!"});
}

export async function activateCard(req:Request,res:Response){
    const { id,cvc,password } : { id:number, cvc:string, password:string } = req.body;

    await CardService.activateCard(id,cvc,password);

    return res.sendStatus(201);
}

export async function getCards(req:Request, res:Response){
    const { id,password } : { id:number, password:string[] } = req.body;

    const result = await CardService.getCards(id,password);

    return res.status(200).send({cards:result});
}

export async function getTransactions(req:Request, res:Response){
    const id:number = Number(req.params.id);

    const result = await CardService.getTransactions(id);

    return res.status(200).send(result);
}

export async function blockCard(req:Request, res:Response) {
    const id:number = Number(req.params.id);
    const { password } : { password:string } = req.body;

    await CardService.blockCard(id,password);

    return res.status(200).send({message: "Card blocked!"});
}

export async function unblockCard(req:Request, res:Response) {
    const id:number = Number(req.params.id);
    const { password } : { password:string } = req.body;

    await CardService.unblockCard(id,password);

    return res.status(200).send({message: "Card unblocked!"});
}

export async function deleteVirtualCard(req:Request, res:Response) {
    const id:number = Number(req.params.id);
    const { password } : { password:string } = req.body;

    await CardService.deleteVirtualCard(id,password);

    return res.status(200).send({message: "Card deleted!"});
}