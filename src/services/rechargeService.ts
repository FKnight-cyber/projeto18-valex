import * as rechargeMethods from "../repositories/rechargeRepository";
import { findByApiKey } from "../repositories/companyRepository";
import { handleError } from "../middlewares/cardErrorHandler";
import * as cardMethods from "../repositories/cardRepository";
import { expiredCard } from "./cardService";

export async function recharge(apiKey:string, id:number, amount:number) {
    const checkApiKey = await findByApiKey(apiKey);
    
    if(!checkApiKey) throw handleError(404,"Invalid API Key!");

    const card = await cardMethods.findById(id);

    if(!card) throw handleError(404,"Card not registered!");
    if(card.isBlocked) throw handleError(401,"Can't recharge blocked card!");
    if(expiredCard(card.expirationDate)) throw handleError(401,"Expired card, can't recharge!");

    await rechargeMethods.insert(id,amount);
}