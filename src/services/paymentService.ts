import * as paymentMethods from "../repositories/paymentRepository";
import * as cardMethods from "../repositories/cardRepository";
import * as businessMethods from "../repositories/businessRepository";
import { format } from "../utils/cardUtils";
import { validateCardPayment } from "../middlewares/validateCard";
import { validateStore } from "../middlewares/validateStore";
import { handleError } from "../middlewares/cardErrorHandler";

export async function purchase(posId:number, id:number, password:string, amount:number){
    const card = await cardMethods.findById(id);

    if(card.isVirtual) throw handleError(401,"Can't use virtual cards to buy in POS!");

    await validateCardPayment(card, null, password, amount);

    const store = await businessMethods.findById(posId);

    await validateStore(store, card);

    await paymentMethods.insert(id,posId,amount);
}

export async function purchaseOnline(posId:number,
    number:string, 
    name:string, 
    expirationDate:string, 
    cvc:string, 
    amount:number) {

    const formatedNumber:string = format(number);

    const card = await cardMethods.findByCardDetails(formatedNumber,name,expirationDate);

    await validateCardPayment(card, cvc, null, amount);

    const store = await businessMethods.findById(posId);

    await validateStore(store, card);

    await paymentMethods.insert(card.originalCardId,posId,amount);
}