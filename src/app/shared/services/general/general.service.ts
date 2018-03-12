import { Injectable } from '@angular/core';
import { UserType } from '../../class';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class GeneralService {

  constructor() { }

  getUserTypeDesc(userType: any) : string{
    if(userType == UserType.Superadmin)
      return "Superadmin";
    else if(userType == UserType.Admin)
      return "Admin";
    else if(userType == UserType.Inspector)
      return "Inspector";
    else if(userType == UserType.PDK)
      return "PDK";
    else if(userType == UserType.Clerk)
      return "Clerk";
    else
      return "error"; 
  }

  toMySqlDateStr(date: NgbDateStruct){
    let temp_date : Date = new Date(date.year, date.month-1, date.day);   
    temp_date.setHours(0, -temp_date.getTimezoneOffset(), 0, 0); 
    // temp_date.setDate(temp_date.getDate() + 1);

    return temp_date.toISOString().slice(0, 19).replace('T', ' ');
  }

  toNgbDateStruct(date: string){
    let temp_date = date.split("-");
    let temp_date2: NgbDateStruct = {year: parseInt(temp_date[0]), month: parseInt(temp_date[1]), day:parseInt(temp_date[2])};
    return temp_date2;
  }

  getPasswordPattern(): string{
    return "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,25}$";
  }

  getUsernamePattern(): string{
    return "^[a-zA-Z0-9.\-_]{4,30}$";
  }

  getAuthObject(){
    let data: any = {   "token"     : this.getToken(),
                        "user_id"   : this.getUserID()};

    return data;
  }

  getUserID(){
     return JSON.parse(localStorage.getItem('userData')).user_id;    
  }

  getToken(){
    return JSON.parse(localStorage.getItem('userData')).token;
  }
}
