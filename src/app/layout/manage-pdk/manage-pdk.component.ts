import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService, GeneralService } from '../../shared';

@Component({
    selector: 'manage-pdk',
    templateUrl: './manage-pdk.component.html',
    styleUrls: ['./manage-pdk.component.scss'],
    animations: [routerTransition()]    
})
export class ManagePDKComponent implements OnInit {
    displayedColumns = ['assignment_id', 'address', 'team', 'postcode', 'date'];
    dataSource: any;
    selectedRowIndex: number = -1;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private auth : AuthService) {
        this.getAssignmentList();
    }

    ngOnInit() {     
    }

    getAssignmentList(){
        let token:string = JSON.parse(localStorage.getItem('userData')).token;
        let user_id: string = JSON.parse(localStorage.getItem('userData')).user_id;

        let data: any = {   "token"     : token,
                            "user_id"   : user_id };
                
        this.auth.postData(data, "api/assignment/assignmentList").then((result) => {
            let responseData: any = result
            if(responseData.status == "0"){
                alert(responseData.status);
            }
            else{
                if(responseData.error){
                    console.log(responseData.error.text);
                }
                else{
                    console.log(responseData);
                    // Assign the data to the data source for the table to render
                    
                    // this.dataSource = new MatTableDataSource(responseData);
                    // this.dataSource.paginator = this.paginator;
                    // this.dataSource.sort = this.sort;
                }
            }
                
        },
        (err) => {
            console.log("API error: " + err);
        });
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
