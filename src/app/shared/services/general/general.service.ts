import { Injectable } from '@angular/core';
import { UserType } from '../../class';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class GeneralService {
  temp_data: any;

  constructor() { }

  setTempData(data){
    this.temp_data = data;
  }

  getTempData(){
    return this.temp_data;
  }

  destroyTempData(){
    this.temp_data = null;
  }

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

  toMySqlDateStr(date: NgbDateStruct, time?: NgbTimeStruct){
    let temp_date : Date = new Date(date.year, date.month-1, date.day);   
    temp_date.setHours(0, -temp_date.getTimezoneOffset(), 0, 0); 
    
    if(time){
      temp_date.setHours(time.hour, -temp_date.getTimezoneOffset(), 0, 0); 
      temp_date.setMinutes(time.minute);
    }

    return temp_date.toISOString().slice(0, 19).replace('T', ' ');
  }

  toNgbDateStruct(mySql_date: string){
    let temp_date = mySql_date.split("-");
    let temp_date2: NgbDateStruct = { year: parseInt(temp_date[0]), month: parseInt(temp_date[1]), day:parseInt(temp_date[2]) };
    return temp_date2;
  }

  toNgbTimeStruct(mySql_time: string){
    let temp_time = mySql_time.split(":");
    let temp_time2: NgbTimeStruct = { hour: parseInt(temp_time[0]), minute: parseInt(temp_time[1]), second: parseInt(temp_time[2]) };
    return temp_time2;
  }
  
  toDateDisplayFormat(mySql_date: string){
    if(this.isSafari())
      mySql_date = mySql_date.replace(/-/g, "/");

    let temp_date = new Date(mySql_date);
    return temp_date.getDate() + "/" + (temp_date.getMonth() + 1) + "/" + temp_date.getFullYear();
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

  getUserType(){
    return JSON.parse(localStorage.getItem('userData')).usertype;    
  }
  
  convertIntToBool(str){
    if(str == "1")
      return true;
    else if( str == "0")
      return false;
  }

  displayErrorAlert(message: string){
    alert("Unable to " + message + ". Please contact system administrator");
  }

  isSafari(){
    var ua = navigator.userAgent.toLowerCase(); 
    if (ua.indexOf('safari') != -1) { 
      if (ua.indexOf('chrome') > -1) {
        return false;
      } else {
        return true;
      }
    }
  }
}
