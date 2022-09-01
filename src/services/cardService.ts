import { findByApiKey } from "../repositories/companyRepository";
import * as cardMethods from "../repositories/cardRepository";
import * as employeeMethods from "../repositories/employeeRepository"
import * as paymentMethods from "../repositories/paymentRepository";
import * as rechargeMethods from "../repositories/rechargeRepository";
import { faker } from '@faker-js/faker';
import { handleError } from "../middlewares/cardErrorHandler";
import { expiredCard, cardName, generateDate, verifyPass } from "../utils/cardUtils";
import { encrypt,decrypt } from "../utils/passwordUtils";

export async function createCard(apiKey:any, 
    employeeId:number, 
    type:cardMethods.TransactionTypes) {

    const checkApiKey = await findByApiKey(apiKey);
    
    if(!checkApiKey) throw handleError(404,"Invalid API Key!");

    const checkEmployee = await employeeMethods.findById(employeeId);
    if(!checkEmployee) throw handleError(404,"Employee not registered!");

    const checkCards = await cardMethods.findByTypeAndEmployeeId(type,employeeId);
    if(checkCards) throw handleError(409,`The employee already have a ${type} card type`)

    const cardholderName:string = cardName(checkEmployee.fullName)
    const number: string = faker.finance.creditCardNumber('####-####-####-###L');
    const expirationDate = generateDate();
    const CVC:string = faker.finance.creditCardCVV();
    const securityCode = encrypt(CVC);

    const cardData:cardMethods.CardInsertData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: '',
        isVirtual: true,
        isBlocked: true,
        type,
      } ; 

      await cardMethods.insert(cardData)
}

export async function activateCard(id:number, cvc:string, password:string) {
  const checkCard = await cardMethods.findById(id);
  console.log(decrypt(checkCard.securityCode));
  
  if(!checkCard) throw handleError(404,`Card not registered!`)
  if(decrypt(checkCard.securityCode) !== cvc) throw handleError(401,"Wrong CVC!");
  if(expiredCard(checkCard.expirationDate)) throw handleError(401,"This card has expired!");
  if(checkCard.password) throw handleError(409,"This card is active!");
  if(!verifyPass(password)) throw handleError(401,"Wrong password!");

  const encryptedPass = encrypt(password)

  await cardMethods.update(id,encryptedPass);
}

export async function getCards(id:number, password:string[]){
  const result:any = []
  
    const { rows:card } = await cardMethods.findByEmployeeId(id);
    if(card.length === 0) throw handleError(404,"This user doesn't have registered cards!");
    for(let i = 0; i < card.length;i++){
      if(password.includes(decrypt(card[i].password))){
        delete card[i].password;
        card[i].securityCode = decrypt(card[i].securityCode)
        result.push(card[i]);
      }
    }

  return result;
}

export async function getTransactions(id:number) {

  const recharges = await rechargeMethods.findByCardId(id);

  if(recharges.length === 0){
    return {
      balance: 0,
      recharges: "No recharges were made!"
    }
  }

  let balance = 0;

  recharges.forEach(element => {
    balance += element.amount;
  });

  const payments = await paymentMethods.findByCardId(id);
  if(payments.length === 0){
    return {
      balance,
      recharges: recharges,
      transactions: "No payments were made!"
    }
  }

  payments.forEach(element => {
    balance -= element.amount;
  });

  const result = {
    balance,
    recharges: recharges,
    transactions: payments
  };

  return result;
}

export async function blockCard(id:number, password:string) {
  const card = await cardMethods.findById(id);

  if(!card) throw handleError(404,"Card not registered!");
  if(card.password === '') throw handleError(401,"Card wasn't activated!");
  if(decrypt(card.password) !== password) throw handleError(401,"Wrong password!");
  if(card.isBlocked) throw handleError(409,"Card already blocked!");
  if(expiredCard(card.expirationDate)) throw handleError(401,"This card has expired!");

  await cardMethods.blockCard(id);
}

export async function unblockCard(id:number, password:string) {
  const card = await cardMethods.findById(id);

  if(!card) throw handleError(404,"Card not registered!");
  if(card.password === '') throw handleError(401,"Card wasn't activated!");
  if(decrypt(card.password) !== password) throw handleError(401,"Wrong Password!");
  if(!card.isBlocked) throw handleError(409,"Card is already active!");
  if(expiredCard(card.expirationDate)) throw handleError(401,"This card has expired!");

  await cardMethods.unblockCard(id);
}