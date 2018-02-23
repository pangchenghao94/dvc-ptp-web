import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-blank-page',
    templateUrl: './manage-pdk.component.html',
    styleUrls: ['./manage-pdk.component.scss'],
    animations: [routerTransition()]    
})
export class ManagePDKComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {     
    }
    
    // open(content, type: any, id: number) {
    //     if(type == "edit"){
    //         this.mode = 2;
    //         // this.auth.getData("api/user/"+id).then((result) => {
    //         //     let userData: any = result
    //         //     if(userData.error){
    //         //         console.log(userData.error.text);
    //         //     }
    //         //     else{
    //         //         //fetch user data to form for edit
    //         //         this.userForm.patchValue({
    //         //             id: id,
    //         //             status: userData.state,
    //         //             fullName: userData.full_name,
    //         //             username: userData.username,
    //         //             email: userData.email,
    //         //             telNo: userData.phone_no,
    //         //             gender: userData.gender,
    //         //             userType: userData.usertype
    //         //         });
                    
    //         //         //disabled input field for username
    //         //         this.userForm.get('username').disable();
                    
    //         //         //remove validators for password and username
    //         //         this.userForm.get('username').clearValidators();
    //         //         this.userForm.get('username').updateValueAndValidity()
    //         //         this.userForm.get('passwordGrp.password').clearValidators();
    //         //         this.userForm.get('passwordGrp.password').setValidators([Validators.pattern(this.passwordPattern)]);                    
    //         //         this.userForm.get('passwordGrp.password').updateValueAndValidity()
    //         //         this.userForm.get('passwordGrp.repeatPassword').clearValidators();
    //         //         this.userForm.get('passwordGrp.repeatPassword').updateValueAndValidity()
                    
    //         //     }
    //         // },
    //         // (err) => {
    //         //     console.log("API error: " + err);
    //         // });
    //     }
    //     else{
    //         this.mode = 1;
    //         //this.userForm.reset();
    //         //this.userForm.get('username').enable();
    //     }

    //     let closeResult: string;
    //     this.modal = this.modalService.open(content, {
    //         backdrop: 'static',
    //         keyboard: false,
    //         size: 'lg'
    //     });
    // }
}
