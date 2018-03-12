import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatPaginator, MatTableDataSource, MatAutocompleteTrigger } from '@angular/material';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { AuthService, User, Assignment, GeneralService } from '../../shared';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as $ from 'jquery';

@Component({
    selector: 'addEdit-pdkassignment-page',
    templateUrl: './addEdit-pdkassignment.component.html',
    styleUrls: ['./addEdit-pdkassignment.component.scss'],
    animations: [routerTransition()]        
})
export class AddEditPDKAssignmentComponent implements OnInit {
    mode: number = 1; //1=add, 2=edit
    assignmentForm: FormGroup;
    users: Array<User> = [];    
    filteredUsers: Observable<any[]>;
    displayedColumns = ['user_id', 'full_name', 'action'];
    dataSource: any;
    showNoUser: boolean = false;
    assignment: Assignment = new Assignment();

    //selectedRowIndex: number = -1;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;

    constructor(private fb: FormBuilder, private auth: AuthService, private changeDetectorRefs: ChangeDetectorRef, private generalService: GeneralService, 
        private route: ActivatedRoute, private router: Router, private general: GeneralService) {

        this.route.params.subscribe(params => {
            this.mode = params['action'];
            if(params['action'] == "2"){
                this.assignment.assignment_id = params['id'];
            }
        });

        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;

        this.assignmentForm = this.fb.group({
            date: ['',Validators.required],
            postcode: ['', [Validators.required, Validators.pattern("^[0-9]{5,5}$")]],
            team: ['', Validators.required],
            address: ['', Validators.required],
            remark: '',
            selectUserCtrl: ''
        });

        this.auth.getData("api/fullNameList").then((result) => {
            let list: any = result;
            
            if(list.status != "1"){
                alert("Error in get fullNameList" + list.error.text);
                console.log(list.error.text);
            }
            else{
                let data:any = list.data;
                data.forEach(user => { 
                    let temp: User = new User();
                    temp.user_id = user.user_id;
                    temp.full_name = user.full_name;
                    this.users.push(temp);
                });

                this.filteredUsers = this.assignmentForm.get('selectUserCtrl').valueChanges
                    .pipe(
                        startWith<string | User>(''),
                        map(value => typeof value === 'string' ? value : value.full_name),
                        map(user => user ? this.filterStates(user) : this.users.slice())
                    );
            }
        },
        (err) => {
            console.log("API error: " + err);
        });

        if(this.mode == 2){
            this.auth.postData(this.general.getAuthObject(), "api/assignment/get/" + this.assignment.assignment_id).then((result) => {
                let assignmentData: any = result;
                        
                if(assignmentData.status == "0"){
                    alert(assignmentData.message);
                }
                else{
                    if(assignmentData.error) {
                        console.log(assignmentData.error.text);
                    }
                    else{
                        this.assignment.assignment_id = assignmentData.data.assignment_id;
                        this.assignment.date = assignmentData.data.date;
                        this.assignment.user_id = assignmentData.data.user_id;
                        this.assignment.team = assignmentData.data.team;
                        this.assignment.address = assignmentData.data.address;
                        this.assignment.remark = assignmentData.data.remark;
                        this.assignment.postcode = assignmentData.data.postcode;
    
                        //fetch user data to form for edit
                        this.assignmentForm.patchValue({
                            date: this.general.toNgbDateStruct(this.assignment.date),
                            postcode: this.assignment.postcode,
                            team: this.assignment.team,
                            address: this.assignment.address,
                            remark: this.assignment.remark
                        });
                    }
                }
            },
            (err) => {
                console.log("API error: " + err);
            });

            this.auth.postData(this.general.getAuthObject(), "api/assignment_admin/getList/" + this.assignment.assignment_id).then((result) => {
                let assignment_admin: any = result;
                        
                if(assignment_admin.status == "0"){
                    alert(assignment_admin.message);
                }
                else{
                    if(assignment_admin.error) {
                        console.log(assignment_admin.error.text);
                    }
                    else{
                        assignment_admin.data.forEach(element => {
                            let temp_user : User = new User();
                            temp_user.user_id = element.user_id;
                            temp_user.full_name = element.full_name;

                            this.dataSource.data.push(temp_user);
                        });

                        this.dataSource._updateChangeSubscription();
                        this.dataSource.paginator = this.paginator;
                    }
                }
            },
            (err) => {
                console.log("API error: " + err);
            }); 
        }
    }

    ngOnInit() {
    }

    //filter function for search
    filterStates(full_name: string) {
        return this.users.filter(user =>
            user.full_name.toLowerCase().indexOf(full_name.toLowerCase()) === 0);
    }

    //display text for user search dropdown
    displayWithFn(user?: User): string | undefined {
        return user ? user.full_name : undefined;
    }

    removeUser(user_id: string){
        this.dataSource.data = this.dataSource.data.filter(function(el){
            return el.user_id != user_id;
        });
    }

    submit(){
        if(this.dataSource.data.length == 0)
                this.showNoUser = this.dataSource.data.length > 0 ? false : true;
        
        else{
            this.assignment.team = this.assignmentForm.get('team').value;
            this.assignment.date = this.generalService.toMySqlDateStr(this.assignmentForm.get('date').value);
            this.assignment.postcode = this.assignmentForm.get('postcode').value;
            this.assignment.remark = this.assignmentForm.get('remark').value;
            this.assignment.address = this.assignmentForm.get('address').value;
            
            let user_id_lst = new Array<string>();
            this.dataSource.data.forEach(element => {
                user_id_lst.push(element.user_id);
            });

            let data: any = this.general.getAuthObject();
            data["data"] = this.assignment;
            data["data2"] = user_id_lst;

            if(this.mode == 1){
                console.log(this.assignment);
                this.auth.postData(data, "api/assignment/add").then((result) => {
                    let responseData:any = result;
                    
                    if(responseData.status == "0"){
                        alert(responseData.message);
                    }
                    else{
                        if(responseData.error) {
                            console.log(responseData.error);
                        }
                        else{
                            alert("Assignment have been added successfully");
                            this.router.navigate(['/managePDK']);
                        }
                    }
                }, 
                (err) =>{
                    console.log("API error: " + err);
                });
            }
            else if(this.mode == 2){
                this.auth.postData(data, "api/assignment/update").then((result) => {
                    let responseData:any = result;
                    
                    if(responseData.status == "0"){
                        alert(responseData.message);
                    }
                    else{
                        if(responseData.error) {
                            console.log(responseData.error);
                        }
                        else{
                            alert("Assignment have been updated successfully");
                            this.router.navigate(['/managePDK']);
                        }
                    }
                }, 
                (err) =>{
                    debugger;
                    console.log("API error: " + err);
                });
            }
        }
    }   
    
    onUserSelect(){
        let temp_user : User = this.assignmentForm.get('selectUserCtrl').value;        

        if(temp_user.user_id == undefined){
            alert('undefined');
        }
        else{
            let exist : boolean = false;
            this.dataSource.data.forEach(element => {
                if(element.user_id == temp_user.user_id)
                    exist = true;
            });

            if(!exist){
                this.dataSource.data.push(this.assignmentForm.get('selectUserCtrl').value);
                this.dataSource._updateChangeSubscription();
                this.dataSource.paginator = this.paginator;
            }
            else{
                alert("User have already been added.");
            }
            this.assignmentForm.get('selectUserCtrl').setValue("");
        }

        $("#txtAutoComplete").blur();
        this.autoComplete.closePanel();       
                     
    }
}