import * as paymentMethods from "../repositories/paymentRepository";
import * as cardMethods from "../repositories/cardRepository";
import * as busMethods from "../repositories/businessRepository";
import { getTransactions } from "./cardService";
import { expiredCard } from "../utils/cardUtils";
import { handleError } from "../middlewares/cardErrorHandler";
import { decrypt } from "../utils/passwordUtils";

export async function purchase(posId:number, id:number, password:string, amount:number){
    const card = await cardMethods.findById(id);

    if(!card) throw handleError(401,"Card not registered!");
    if(card.password === '') 
    throw handleError(401,"Purchase failed, card wasn't activated!");
    if(decrypt(card.password) !== password) 
    throw handleError(401,"Purchase failed, wrong password!");
    if(card.isBlocked) 
    throw handleError(401,"Purchase failed, card is blocked!");
    if(expiredCard(card.expirationDate)) 
    throw handleError(401,"Purchase failed, card has expired!");

    const store = await busMethods.findById(posId);

    if(!store) throw handleError(404,"Purchase failed, store not registered!");
    if(store.type !== card.type) 
    throw handleError(409,"Purchase failed, this store doesn't accept this type of card!");
    

    const { balance } : { balance:number }  = await getTransactions(id);

    if(balance - amount < 0) throw handleError(406,"Purchase failed, insufficient balance!");

    await paymentMethods.insert(id,posId,amount);
} 