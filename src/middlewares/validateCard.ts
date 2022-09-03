import { handleError } from "./cardErrorHandler";
import { expiredCard } from "../utils/cardUtils";
import { decrypt } from "../utils/passwordUtils";
import { getTransactions } from "../services/cardService";

export async function validateCardPayment(card:any, cvc:any, password:any,amount:number){
    if(!card) 
    throw handleError(404,"Purchase failed, check your card informations and try again!");

    if(card.isBlocked) 
    throw handleError(401,"Purchase failed, card is blocked!");

    if(expiredCard(card.expirationDate)) 
    throw handleError(401,"Purchase failed, card has expired!");

    if(cvc !== null){
      if(decrypt(card.securityCode) !== cvc)
      throw handleError(401,"Purchase failed, wrong security code!");
    }

    if(password !== null){
      if(card.password === '') 
        throw handleError(401,"Purchase failed, card wasn't activated!");

      if(decrypt(card.password) !== password) 
        throw handleError(401,"Purchase failed, wrong password!");
    }

    let id = card.id;
    
    if(card.originalCardId !== null){
      id = card.originalCardId;
    }
    
    const { balance } : { balance:number }  = await getTransactions(id);

    if(balance - amount < 0) throw handleError(406,"Purchase failed, insufficient balance!");
}