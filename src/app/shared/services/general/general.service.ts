import { Injectable } from '@angular/core';
import { UserType } from '../../class';

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
}
