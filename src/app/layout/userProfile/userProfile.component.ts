import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthService, User, GeneralService } from '../../shared';

@Component({
    selector: 'user-profile',
    templateUrl: './UserProfile.component.html',
    styleUrls: ['./UserProfile.component.scss'],
    animations: [routerTransition()]            
})
export class UserProfileComponent implements OnInit {
    user : User = new User();
    usertypeStr: string;

    constructor(private auth: AuthService, private general: GeneralService) {
        let token:string = JSON.parse(localStorage.getItem('userData')).token;
        let user_id: string = JSON.parse(localStorage.getItem('userData')).user_id;
        let data: any = {   "token"     : token,
                            "user_id"   : user_id};

        this.auth.postData(data, "api/user/get/" + user_id).then((result) => {
            let user: any = result;
                    
            if(user.status == "0"){
                alert(user.message);
            }
            else{
                if(user.error) {
                    console.log(user.error);
                }
                else{
                    this.user.full_name = user.data.full_name;
                    this.user.username = user.data.username;
                    this.user.phone_no = user.data.phone_no;
                    this.user.gender = user.data.gender;
                    this.user.usertype = user.data.usertype;
                    this.usertypeStr = this.general.getUserTypeDesc(this.user.usertype);
                    console.log(this.user);
                }
            }
        },
        (err) => {
            console.log("API error: " + err);
        });
    }

    ngOnInit() {}
}
