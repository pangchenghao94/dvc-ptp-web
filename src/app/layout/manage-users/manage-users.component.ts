import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService, User, UserType, GeneralService } from '../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
    selector: 'manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.scss'],
    animations: [routerTransition()]
})

export class ManageUsersComponent implements OnInit {
    displayedColumns = ['user_id', 'full_name', 'ic_no', 'usertype', 'phone_no', 'state'];
    dataSource: any;
    mode: number = 0    ; //0=view, 1=add, 2=edit, 
    userForm: any;
    modal: NgbModalRef;
    user: User = new User();
    loading: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private auth: AuthService, private general: GeneralService, private modalService: NgbModal, private fb: FormBuilder) {
        this.getUserList();
    }
    
    ngOnInit(): void {
        this.userForm = this.fb.group({
            id: '-1',
            status: '1',
            ic_no: ['', [Validators.required, Validators.pattern("^[0-9]{12,12}$")]],

            fullName: ['',
                [Validators.required, Validators.minLength(6)]],

            username: ['', 
                [Validators.required, Validators.pattern(this.general.getUsernamePattern())], 
                this.checkUniqueUsername.bind(this)],

            passwordGrp: this.fb.group({
                password: ['', [Validators.required, Validators.pattern(this.general.getPasswordPattern())]],
                repeatPassword: ['', [Validators.required]],
            }, { validator: this.checkPasswordEqual }),

            email: ['',[Validators.required, Validators.email]],
            telNo: ['', [Validators.required, Validators.pattern("^[0-9]{10,12}$")]],
            gender: ['', Validators.required],
            userType: ['', Validators.required]
        });
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

    getUserList(){
        this.loading = true;
        this.auth.postData(this.general.getAuthObject(), "api/userlist").then((result) => {
            let userList: any = result;

            if(userList.status == "0"){
                alert(userList.message);
            }
            else{
                if(userList.error){
                    console.log(userList.error.text);
                }
                else{
                    // Assign the data to the data source for the table to render
                    userList.data.forEach(element => {
                        element.usertype = this.general.getUserTypeDesc(element.usertype)
                    });
                    
                    this.dataSource = new MatTableDataSource(userList.data);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            }
            this.loading = false;
        },
        (err) => {
            this.loading = false;
            this.general.displayErrorAlert("get user list");
            console.log("API error: " + err);
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    
    open(content, type: any, id: number) {
        this.loading = true;
        if(type != "add"){
            this.mode = 0;

            this.auth.postData(this.general.getAuthObject(), "api/user/get/" + id).then((result) => {
                let userData: any = result;
                    
                if(userData.status == "0"){
                    alert(userData.message);
                }

                else{
                    if(userData.error) {
                        console.log(userData.error.text);
                    }

                    else{
                        this.user = new User();
                        this.user.user_id = id;
                        this.user.ic_no = userData.data.ic_no;                        
                        this.user.state = userData.data.state;
                        this.user.full_name = userData.data.full_name;
                        this.user.username = userData.data.username;
                        this.user.email = userData.data.email;
                        this.user.phone_no = userData.data.phone_no;
                        this.user.gender = userData.data.gender;
                        this.user.usertype = userData.data.usertype;
                    }
                }
                this.loading = false;
            },
            (err) => {
                this.loading = false;  
                this.modal.close();          
                this.general.displayErrorAlert("get user data");      
                console.log(err);
            });
        }
        else{
            this.loading = false;
            this.mode = 1;
            this.userForm.reset();
            this.userForm.get('username').enable();
            this.userForm.get('passwordGrp').enable();
        }

        let closeResult: string;
        this.modal = this.modalService.open(content, {
            backdrop: 'static',
            keyboard: false
        });
    }

    editUser(){
        //fetch user data to form for edit
        this.mode = 2;
        this.userForm.patchValue({
            id: this.user.user_id,
            status: this.user.state,
            ic_no: this.user.ic_no,            
            fullName: this.user.full_name,
            username: this.user.username,
            email: this.user.email,
            telNo: this.user.phone_no,
            gender: this.user.gender,
            userType: this.user.usertype
        });
        
        //disabled input field for username
        //remove validators for password and username                            
        this.userForm.get('username').disable();                            
        this.userForm.get('username').clearValidators();
        this.userForm.get('username').updateValueAndValidity()
        this.userForm.get('passwordGrp').disable();

    }

    submit() {
        if(this.mode == 1){
            this.loading = true;
            let user: User = new User();
            user.username = this.userForm.get('username').value;
            user.ic_no = this.userForm.get('ic_no').value;
            user.password = this.userForm.get('passwordGrp.repeatPassword').value; 
            user.full_name = this.userForm.get('fullName').value;
            user.phone_no = this.userForm.get('telNo').value;
            user.email = this.userForm.get('email').value;
            user.gender = this.userForm.get('gender').value;
            user.usertype = this.userForm.get('userType').value;

            let data: any = this.general.getAuthObject();
            data["data"] = user;

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
                            ic_no: this.userForm.get('ic_no').value,
                            usertype: this.general.getUserTypeDesc(this.userForm.get('userType').value), 
                            phone_no: this.userForm.get('telNo').value, 
                            state: "1"
                        });
                        this.dataSource._updateChangeSubscription();
                        this.dataSource.paginator = this.paginator;
                    }
                }
                this.loading = false;
                this.modal.close();
            }, 
            (err) =>{
                this.loading = false;
                this.general.displayErrorAlert("add user");
                console.log(err);
            });
        }
        else if(this.mode == 2){
            this.loading = true;
            let postData: any = this.general.getAuthObject();
            postData.ic_no = this.userForm.get('ic_no').value;
            postData.full_name = this.userForm.get('fullName').value;
            postData.phone_no = this.userForm.get('telNo').value;
            postData.email = this.userForm.get('email').value;
            postData.gender = this.userForm.get('gender').value;
            postData.usertype = this.userForm.get('userType').value;

            this.auth.postData(postData, "api/user/update/" + this.userForm.get('id').value).then((result) => {
                let responseData:any = result;
                if(responseData.status == "0"){
                    console.log(responseData.message);
                    alert(responseData.message);
                }
                else if(responseData.error) {
                    console.log(responseData.error.text);
                    alert(responseData.error.text);                    
                }
                else{
                    alert("User have been updated successfully");
                    for(let result of this.dataSource.data){
                        if(result.user_id == this.userForm.get('id').value){
                            result.full_name = this.userForm.get('fullName').value;
                            result.usertype = this.general.getUserTypeDesc(this.userForm.get('userType').value);
                            result.phone_no = this.userForm.get('telNo').value;
                            result.ic_no = this.userForm.get('ic_no').value;                            
                        } 
                    }
                }
                this.loading = false;
                this.modal.close();
            }, 
            (err) =>{
                this.loading = false;
                this.general.displayErrorAlert("update user");
                console.log(err);
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
            }, 500);
        });
        return promise;
    }

    resetPassword(id: any){
        if(confirm('Confirm to reset user password to his/her IC No. ?')){
            this.loading = true;
            let postData: any = this.general.getAuthObject();
            postData.usertype = this.general.getUserType();
            postData.data = {
                password: this.userForm.get('ic_no').value,
                user_id: this.userForm.get('id').value
            };
            this.auth.postData(postData, "api/user/resetPassword").then((result) => {
                let responseData: any = result;
                if(responseData.error){
                    console.log(responseData.error.message);
                }
                else{
                    alert('Successfully Reset User Password');
                }
                this.loading = false;
                this.modal.close();
            },
            (err) => {
                this.loading = false;
                console.log("API error: " + err);
            });
        }
    }

    changeUserState(id: any, type: number){
        if(type == 0){//deactive
            if(confirm('Confirm to deactive user ' + this.userForm.get('fullName').value + ' ?')){
                this.loading = true;
                this.auth.getData("api/user/deactivate/"+id).then((result) => {
                    let userData: any = result
                    if(userData.error){
                        console.log(userData.error.text);
                    }
                    else{
                        alert('User deactivate successfully');
                        for(let result of this.dataSource.data){
                            if(result.user_id == id){
                                result.state = "0";
                            } 
                        }
                    }
                    this.loading = false;
                    this.modal.close();
                },
                (err) => {
                    this.loading = false;
                    console.log("API error: " + err);
                });
            
                

            }
        }
        else if(type == 1){//activate
            if(confirm('Confirm to activate user ' + this.userForm.get('fullName').value + ' ?')){
                this.loading = true;
                this.auth.getData("api/user/activate/"+id).then((result) => {
                    let userData: any = result
                    if(userData.error){
                        console.log(userData.error.text);
                    }
                    else{
                        alert('User activate successfully');

                        for(let result of this.dataSource.data){
                            if(result.user_id == id){
                                result.state = "1";
                            } 
                        }
                        
                        this.loading = false;
                        this.modal.close();
                    }
                },
                (err) => {
                    this.loading = false;
                    console.log("API error: " + err);
                });
            }
        }
        else{
            alert("Error in code logic.");
            this.modal.close();
        }
    }
}

