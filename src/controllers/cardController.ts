import { Request, Response } from "express";
import { createCardService } from "../services/createCard";

declare module 'http' {
    interface IncomingHttpHeaders {
        "x-api-key"?: string
    }
}

export async function createCard(req:Request,res:Response) {
    const apiKey = req.headers['x-api-key'];
    const id = Number(req.params.id);
    const { type } = req.body;

    await createCardService(apiKey,id,type);

    return res.sendStatus(201);
}