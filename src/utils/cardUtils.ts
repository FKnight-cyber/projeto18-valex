import dayjs from "dayjs";
import * as cardMethods from "../repositories/cardRepository";

export function expiredCard(date:string){
    const currentDate = dayjs(Date.now(),'dd/mm/yyyy').format('MM/YY');
    const months = Number(currentDate[0] + currentDate[1]);
    const years = Number(currentDate[3] + currentDate[4]);
    const cardMonths = Number(date[0] + date[1]);
    const cardYears = Number(date[3] + date[4]);
  
    if(years > cardYears) return true;
    if(months > cardMonths && years === cardYears) return true;
    return false;
}

export function cardName(nome:string) {
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


export function generateDate(){
    const date = dayjs(Date.now(),'dd/mm/yyyy').format('MM/YY');
    const expireDate = (Number(date[date.length-2] + date[date.length-1]) + 5).toString();
    
    return date.slice(0, -2) + expireDate;
}

export function verifyPass(password:any){
    const reg = new RegExp('^[0-9]{4}$')
  
    return reg.test(password);
}

export function format(str:string){
  return str.slice(0,4)+'-'+str.slice(4,8)+'-'+str.slice(8,12)+'-'+str.slice(12,16);
}

export function fillCardInfo(employeeId:number, number:string,
  cardholderName:string,
  securityCode:string,
  expirationDate:string,
  password:string,
  isVirtual:boolean,
  originalCardId:any,
  isBlocked:boolean,
  type:cardMethods.TransactionTypes){

  const cardData:cardMethods.CardInsertData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type
  } ; 

  return cardData;
}

