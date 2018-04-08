import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstant } from '../../class';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private Globals: GlobalConstant, private http: HttpClient) { }

  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let url = this.Globals.apiURL+type;
      let body = JSON.stringify(credentials);

      this.http
        .post(url, body, {headers: headers})
        .subscribe(
          res   =>{ resolve(res); }, 
          (err) =>{ reject(err); } 
        );
    })
  }

  postData2(credentials, type){

    return new Promise((resolve, reject) =>{
      
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/form-data');

      let url = this.Globals.apiURL+type;
      //let body = JSON.stringify(credentials);

      this.http
        .post(url, credentials, {headers: headers})
        .subscribe(
          res   =>{ resolve(res); }, 
          (err) =>{ reject(err); } 
        );
    })
  }

  getData(type){

    return new Promise((resolve, reject) =>{
      let headers = new HttpHeaders();
      let url = this.Globals.apiURL+type;

      this.http
        .get(url, {headers: headers})
        .subscribe(
          res   =>{ resolve(res); }, 
          (err) =>{ reject(err); } 
        );
    });
  }
}
