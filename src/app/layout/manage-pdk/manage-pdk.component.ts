import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService, UserType, GeneralService } from '../../shared';
import { NgbModal, NgbModalRef, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { validateConfig } from '@angular/router/src/config';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
    selector: 'app-blank-page',
    templateUrl: './manage-pdk.component.html',
    styleUrls: ['./manage-pdk.component.scss'],
    animations: [routerTransition()]    
})
export class ManagePDKComponent implements OnInit {
    modal: NgbModalRef;
    mode: number = 1; //1=add, 2=edit, 3=delete    
    model: NgbDateStruct;
    date: {year: number, month: number};
    assignmentForm: FormGroup;
    selectUserCtrl: FormControl;
    filteredUser: Observable<any[]>;
    user: any;

    constructor(private modalService: NgbModal, private fb: FormBuilder, private auth: AuthService) {
    }

    ngOnInit() {
        this.assignmentForm = this.fb.group({
            date: ['',Validators.required],
            postcode: ['', [Validators.requiredTrue, Validators.pattern("^[0-9]{10,12}$")]],
            team: ['', Validators.required],
            address: ['', Validators.required],
            remark: ''
        });

        this.selectUserCtrl = new FormControl();

        this.auth.getData("api/fullNameList").then((result) => {
            let list: any = result

            if(list.status != "1"){
                alert("Error in get fullNameList" + list.error.text);
                console.log(list.error.text);
            }
            else{
                this.user = list.data;
                this.filteredUser = this.selectUserCtrl.valueChanges
                .pipe(
                    startWith(''),
                    map(u => u ? this.filterUsers(u) : this.user.slice())
                );
                console.log(this.user.slice());
            }
        },
        (err) => {
            console.log("API error: " + err);
        });
    }

    filterUsers(full_name: string) {
        console.log(full_name);
        return this.user.filter(u =>
          u.full_name.toLowerCase().indexOf(full_name.toLowerCase()) === 0);
    }

    open(content, type: any, id: number) {
        if(type == "edit"){
            this.mode = 2;
            // this.auth.getData("api/user/"+id).then((result) => {
            //     let userData: any = result
            //     if(userData.error){
            //         console.log(userData.error.text);
            //     }
            //     else{
            //         //fetch user data to form for edit
            //         this.userForm.patchValue({
            //             id: id,
            //             status: userData.state,
            //             fullName: userData.full_name,
            //             username: userData.username,
            //             email: userData.email,
            //             telNo: userData.phone_no,
            //             gender: userData.gender,
            //             userType: userData.usertype
            //         });
                    
            //         //disabled input field for username
            //         this.userForm.get('username').disable();
                    
            //         //remove validators for password and username
            //         this.userForm.get('username').clearValidators();
            //         this.userForm.get('username').updateValueAndValidity()
            //         this.userForm.get('passwordGrp.password').clearValidators();
            //         this.userForm.get('passwordGrp.password').setValidators([Validators.pattern(this.passwordPattern)]);                    
            //         this.userForm.get('passwordGrp.password').updateValueAndValidity()
            //         this.userForm.get('passwordGrp.repeatPassword').clearValidators();
            //         this.userForm.get('passwordGrp.repeatPassword').updateValueAndValidity()
                    
            //     }
            // },
            // (err) => {
            //     console.log("API error: " + err);
            // });
        }
        else{
            this.mode = 1;
            //this.userForm.reset();
            //this.userForm.get('username').enable();
        }

        let closeResult: string;
        this.modal = this.modalService.open(content, {
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        });
    }

    submit(){}
}
