import { Injectable } from '@angular/core';
import { UserType } from '../../class';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    temp_date.setDate(temp_date.getDate() + 1);

    return temp_date.toISOString().slice(0, 19).replace('T', ' ');
  }
}
