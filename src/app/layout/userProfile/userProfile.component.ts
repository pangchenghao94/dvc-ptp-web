import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthService, User, GeneralService } from '../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
    selector: 'user-profile',
    templateUrl: './UserProfile.component.html',
    styleUrls: ['./UserProfile.component.scss'],
    animations: [routerTransition()]            
})
export class UserProfileComponent implements OnInit {
    user : User = new User();
    modal: NgbModalRef;
    usertypeStr: string;
    changePasswordForm: any;
    loading: boolean = false;

    constructor(private auth: AuthService, private general: GeneralService, private modalService: NgbModal, private fb: FormBuilder) {
        this.loading = true;
        this.auth.postData(this.general.getAuthObject(), "api/user/get/" + this.general.getUserID()).then((result) => {
            let user: any = result;
                    
            if(user.status == "0"){
                alert(user.message);
            }
            else{
                if(user.error) {
                    console.log(user.error.text);
                }
                else{
                    this.user.full_name = user.data.full_name;
                    this.user.username = user.data.username;
                    this.user.phone_no = user.data.phone_no;
                    this.user.gender = user.data.gender;
                    this.user.usertype = user.data.usertype;
                    this.usertypeStr = this.general.getUserTypeDesc(this.user.usertype);
                }
            }
            this.loading = false;
        },
        (err) => {
            this.loading = false;
            console.log(err);
        });
    }

    ngOnInit() {}

    changePassword(changePasswordModal){
        this.changePasswordForm = this.fb.group({
            oldPass: ['', Validators.required],
            passwordGrp: this.fb.group({
                newPass: ['', [Validators.required, Validators.pattern(this.general.getPasswordPattern())]],
                newPassRepeat: ['', [Validators.required]]
            }, { validator: this.checkPasswordEqual })
        });

        this.modal = this.modalService.open(changePasswordModal, {
            backdrop: 'static',
            keyboard: false
        });
    }

    
    checkPasswordEqual(c: AbstractControl): {[key: string]: boolean} | null{
        let password = c.get('newPass');
        let repeatPassword = c.get('newPassRepeat');
        
        if(password.pristine || repeatPassword.pristine)
            return null;
    
        if(password.value === repeatPassword.value){
            return null;
        }
        return { 'match' : true };
    }

    submit(){
        let data : any = this.general.getAuthObject();
        data["data"] = {
            "oldPass"       : this.changePasswordForm.get('oldPass').value,
            "newPassRepeat" : this.changePasswordForm.get('passwordGrp.newPassRepeat').value
        };

        this.loading = true;
        this.auth.postData(data, "api/user/changePassword").then((result) => {
            let responseData: any = result
            console.log(responseData);
            if(responseData.status == "0"){
                alert(responseData.message);
            }
            else{
                if(responseData.error){
                    console.log(responseData.error.text);
                }
                else{
                    alert("Password has been updated successfully");
                    this.modal.close();
                    this.changePasswordForm.reset();
                }
            }
            this.loading = false;
        },
        (err) => {
            this.loading = false;
            console.log(err);
        });
    }
}
