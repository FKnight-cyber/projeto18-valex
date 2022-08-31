import { findByApiKey } from "../repositories/companyRepository";
import * as cardMethods from "../repositories/cardRepository";
import * as employeeMethods from "../repositories/employeeRepository"
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

function notFoundError(entity:string) {
	return {
		type: "error_not_found",
		message: `Could not find specified "${entity}"!`
	};
}

function alreadyRegisteredError(entity:string) {
	return {
		type: "error_already_registered",
		message: `This user already have a ${entity} card type!`
	};
}

function cardName(nome:string) {
    const nome2 = nome.split(' ');
    const nome3:string[] = [];
  
    for(let i = 0; i < nome2.length;i++){
      if(i===0) nome3.push(nome2[i].toUpperCase())
      if(i !== 0 && i !== nome2.length-1){
        if(nome2[i].length >= 3){
          nome3.push(nome2[i][0].toUpperCase())
        }
      }
      if(i === nome2.length-1) nome3.push(nome2[i].toUpperCase())
    }
    return nome3.join(' ')
  }

function generateDate(date:string){
  const n = (Number(date[date.length-2] + date[date.length-1]) + 5).toString();
  
  return date.slice(0, -2) + n;
}

export async function createCardService(apiKey:any, 
    employeeId:number, 
    type:cardMethods.TransactionTypes) {

    if(type === 'groceries' || type === 'restaurant' || type === 'transport'
    || type === 'education' || type === 'health'){
      console.log("ok");
    }else{
      throw notFoundError("type");
    }

    const checkApiKey = await findByApiKey(apiKey);
    
    if(!checkApiKey) throw notFoundError("API KEY");

    const checkEmployee = await employeeMethods.findById(employeeId);
    if(!checkEmployee) throw notFoundError("Employee");

    const checkCards = await cardMethods.findByTypeAndEmployeeId(type,employeeId);
    if(checkCards) throw alreadyRegisteredError(`${type}`)

    const cardholderName:string = cardName(checkEmployee.fullName)
    const number: string = faker.finance.creditCardNumber('####-####-####-###L');
    const currentDate = dayjs(Date.now(),'dd/mm/yyyy').format('MM/YY');
    const expirationDate = generateDate(currentDate);
    const CVC:string = faker.finance.creditCardCVV();
    const securityCode = cryptr.encrypt(CVC);

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