import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService, UserType, GeneralService } from '../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from '../../shared';

@Component({
    selector: 'app-blank-page',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.scss'],
    animations: [routerTransition()]
})

export class ManageUsersComponent implements OnInit {
    displayedColumns = ['user_id', 'full_name', 'usertype', 'phone_no', 'state'];
    dataSource: any;
    selectedRowIndex: number = -1;
    mode: number = 1; //1=add, 2=edit, 3=delete
    userForm: any;
    modal: NgbModalRef;

    passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,25}$";
    usernamePattern = "^[a-zA-Z0-9.\-_]{4,30}$";

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private auth: AuthService, private general: GeneralService, private modalService: NgbModal, private fb: FormBuilder) {
        this.getUserList();
    }
    
    ngOnInit(): void {
        this.userForm = this.fb.group({
            id: '-1',
            status: '1',
            fullName: ['',
                [Validators.required, Validators.minLength(6)]],

            username: ['', 
                [Validators.required, Validators.pattern(this.usernamePattern)], 
                this.checkUniqueUsername.bind(this)],

            passwordGrp: this.fb.group({
                password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
                repeatPassword: ['', [Validators.required]],
            }, { validator: this.checkPasswordEqual }),

            email: ['',[Validators.required, Validators.email]],
            telNo: ['', [Validators.required, Validators.pattern("^[0-9]{10,12}$")]],
            gender: ['', Validators.required],
            userType: ['', Validators.required]
        });
    }

    getUserList(){
        this.auth.getData("api/userlist").then((result) => {
            let userList: any = result

            if(userList.error){
                console.log(userList.error.text);
            }
            else{
                // Assign the data to the data source for the table to render
                for(let result of userList){
                    result.usertype = this.general.getUserTypeDesc(result.usertype);
                }
                this.dataSource = new MatTableDataSource(userList);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        },
        (err) => {
            console.log("API error: " + err);
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    rowClicked(row){
        this.selectedRowIndex = row.user_id;
    }
    
    open(content, type: any, id: number) {
        if(type == "edit"){
            this.mode = 2;
            this.auth.getData("api/user/"+id).then((result) => {
                let userData: any = result
                if(userData.error){
                    console.log(userData.error.text);
                }
                else{
                    //fetch user data to form for edit
                    this.userForm.patchValue({
                        id: id,
                        status: userData.state,
                        fullName: userData.full_name,
                        username: userData.username,
                        email: userData.email,
                        telNo: userData.phone_no,
                        gender: userData.gender,
                        userType: userData.usertype
                    });
                    
                    //disabled input field for username
                    this.userForm.get('username').disable();
                    
                    //remove validators for password and username
                    this.userForm.get('username').clearValidators();
                    this.userForm.get('username').updateValueAndValidity()
                    this.userForm.get('passwordGrp.password').clearValidators();
                    this.userForm.get('passwordGrp.password').setValidators([Validators.pattern(this.passwordPattern)]);                    
                    this.userForm.get('passwordGrp.password').updateValueAndValidity()
                    this.userForm.get('passwordGrp.repeatPassword').clearValidators();
                    this.userForm.get('passwordGrp.repeatPassword').updateValueAndValidity()
                    
                }
            },
            (err) => {
                console.log("API error: " + err);
            });
        }
        else{
            this.mode = 1;
            this.userForm.reset();
            this.userForm.get('username').enable();
        }

        let closeResult: string;
        this.modal = this.modalService.open(content, {
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        });
    }

    submit() {
        let token:string = JSON.parse(localStorage.getItem('userData')).token;
        let user_id: string = JSON.parse(localStorage.getItem('userData')).user_id;

        if(this.mode == 1){
            let user: User = new User(null, 
                this.userForm.get('username').value,
                null,
                this.userForm.get('passwordGrp.repeatPassword').value, 
                this.userForm.get('fullName').value, 
                this.userForm.get('telNo').value, 
                this.userForm.get('email').value, 
                this.userForm.get('gender').value,
                this.userForm.get('userType').value);
            delete user.user_id;
            delete user.state;

            let data: any = {   "token"     : token,
                                "user_id"   : user_id, 
                                "data"      : user};
            
            this.auth.postData(data, "api/user/add").then((result) => {
                let responseData:any = result;
    
                if(responseData.status == "0"){
                    alert(responseData.status);
                }
                else{
                    if(responseData.error) {
                        console.log(responseData.error);
                    }
                    else{
                        alert("User have been added successfully");
                        this.dataSource.data.push({
                            user_id: responseData.id, 
                            full_name: this.userForm.get('fullName').value, 
                            usertype: this.general.getUserTypeDesc(this.userForm.get('userType').value), 
                            phone_no: this.userForm.get('telNo').value, 
                            state: "1"
                        });
                        this.dataSource._updateChangeSubscription();
                        this.dataSource.paginator = this.paginator;
                    }
                }
                this.modal.close();
            }, 
            (err) =>{
                console.log("API error: " + err);
            });
        }
        else if(this.mode == 2){
            let user: User = new User(null, null, null,
                this.userForm.get('passwordGrp.repeatPassword').value, 
                this.userForm.get('fullName').value, 
                this.userForm.get('telNo').value, 
                this.userForm.get('email').value, 
                this.userForm.get('gender').value,
                this.userForm.get('userType').value);
            delete user.user_id
            delete user.username
            delete user.state;

            if(this.userForm.get('passwordGrp.repeatPassword').value == ""){
                delete user.password;
            }
            
            this.auth.postData(user, "api/user/update/" + this.userForm.get('id').value).then((result) => {
                let responseData:any = result;

                if(responseData.error) {
                    console.log(responseData.error);
                }
                else{
                    alert("User have been updated successfully");
                    for(let result of this.dataSource.data){
                        if(result.user_id == this.userForm.get('id').value){
                            result.full_name = this.userForm.get('fullName').value;
                            result.usertype = this.general.getUserTypeDesc(this.userForm.get('userType').value);
                            result.phone_no = this.userForm.get('telNo').value;
                        } 
                    }
                }
                
                this.modal.close();
            }, 
            (err) =>{
                console.log("API error: " + err);
            });
        }
    }

    checkUniqueUsername(c: AbstractControl): Promise<any>{
        const promise = new Promise<any>((resolve, reject)=>{
            setTimeout(()=>{
                let username = {"username": c.value };
                this.auth.postData(username, "api/checkUniqueUsername").then((result) => {
                    if(result)
                        resolve({ 'unique' : true });
                    else
                        resolve(null);
                },
                (err) => {
                    console.log("API error: " + err);
                    resolve(null);
                });
            }, 1500);
        });
        return promise;
    }

    checkPasswordEqual(c: AbstractControl): {[key: string]: boolean} | null{
        let password = c.get('password');
        let repeatPassword = c.get('repeatPassword');
        
        if(password.pristine || repeatPassword.pristine)
            return null;

        if(password.value === repeatPassword.value){
            return null;
        }
        return { 'match' : true };
    }

    changeUserState(id: any, type: number){
        if(type == 0){//deactive
            if(confirm('Confirm to deactive user ' + this.userForm.get('fullName').value + ' ?')){
                this.auth.getData("api/user/deactivate/"+id).then((result) => {
                    let userData: any = result
                    if(userData.error){
                        console.log(userData.error.text);
                    }
                    else{
                        alert('User deactivate successfully');
                        console.log(userData.message);
                    }
                },
                (err) => {
                    console.log("API error: " + err);
                });
            
                for(let result of this.dataSource.data){
                    if(result.user_id == id){
                        result.state = "0";
                    } 
                }

                this.modal.close();
            }
        }
        else if(type == 1){//activate
            if(confirm('Confirm to activate user ' + this.userForm.get('fullName').value + ' ?')){
                this.auth.getData("api/user/activate/"+id).then((result) => {
                    let userData: any = result
                    if(userData.error){
                        console.log(userData.error.text);
                    }
                    else{
                        alert('User activate successfully');
                        console.log(userData.message);
                    }
                },
                (err) => {
                    console.log("API error: " + err);
                });

                for(let result of this.dataSource.data){
                    if(result.user_id == id){
                        result.state = "1";
                    } 
                }

                console.log(this.dataSource.data);
                this.modal.close();
            }
        }
        else{
            alert("Error in code logic.");
            this.modal.close();
        }
    }
}

