import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService, User } from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    responseData : any;
    user : User;
    userData : any;

    showWrongUsernameOrPass : boolean = true;
    showPassEmpty : boolean = true;

    constructor(public router: Router, public auth: AuthService) {
        this.user = new User();
    }

    ngOnInit() {}

    login(){
        if(!this.user.password){
            this.showPassEmpty = false;
            this.showWrongUsernameOrPass = true;
        }

        else{
            this.userData = {"username": this.user.username, "password" : this.user.password};

            this.auth.postData(this.userData, "api/login").then((result) => {
                this.responseData = result;
    
                if(this.responseData.status == "2") {
                    this.showPassEmpty = true;
                    this.showWrongUsernameOrPass = false;
                }
                else if(this.responseData.status == "3"){
                    console.log(this.responseData.message);
                }
                else{
                    if(this.responseData.data.state == 0) //user deactivated 
                    {
                        this.showPassEmpty = true;
                        this.showWrongUsernameOrPass = false;
                    }
                    else{
                        localStorage.setItem('userData', JSON.stringify(this.responseData.data)); 
                        localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate(['/dashboard']);
                    }
                }
            }, 
            (err) =>{
                console.log("API error: " + err);
            });
        }
    }
}
