import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User, Assignment, GeneralService } from '../../shared';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
    selector: 'addEdit-pdkassignment-page',
    templateUrl: './addEdit-pdkassignment.component.html',
    styleUrls: ['./addEdit-pdkassignment.component.scss'],
    animations: [routerTransition()]        
})
export class AddEditPDKAssignmentComponent implements OnInit {
    mode: number = 1; //1=add, 2=edit, 3=delete  
    dpMinDate: NgbDateStruct;
    assignmentForm: FormGroup;
    users: Array<User> = [];    
    //selectUserCtrl: FormControl;
    filteredUsers: Observable<any[]>;
    displayedColumns = ['user_id', 'full_name', 'action'];
    dataSource: any;
    showNoUser: boolean = false;
    
    //selectedRowIndex: number = -1;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private fb: FormBuilder, private auth: AuthService, private changeDetectorRefs: ChangeDetectorRef, private generalService: GeneralService, 
        private route: ActivatedRoute, private router: Router) {

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
            let list: any = result

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

        //set min date for assignment == tomorrow
        let today = new Date();
        this.dpMinDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() + 1};
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if(params['action'] == "1"){
                this.mode = 1;
            } 
            else if(params['action'] == "2"){
                this.mode = 2;
            }
         });
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

    addUser(){
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
    }

    submit(){
        if(this.dataSource.data.length == 0)
            this.showNoUser = this.dataSource.data.length > 0 ? false : true;
        else{
            let token:string = JSON.parse(localStorage.getItem('userData')).token;
            let user_id: string = JSON.parse(localStorage.getItem('userData')).user_id;

            if(this.mode == 1){
                let assignment: Assignment = new Assignment();
                assignment.team = this.assignmentForm.get('team').value;
                assignment.date = this.generalService.toMySqlDateStr(this.assignmentForm.get('date').value);
                assignment.postcode = this.assignmentForm.get('postcode').value;
                assignment.remark = this.assignmentForm.get('remark').value;
                assignment.address = this.assignmentForm.get('address').value;

                let user_id_lst = new Array<string>();
                this.dataSource.data.forEach(element => {
                    user_id_lst.push(element.user_id);
                });

                let data: any = {   "token"     : token,
                                    "user_id"   : user_id, 
                                    "data"      : assignment,
                                    "data2"     : user_id_lst };
                
                this.auth.postData(data, "api/assignment/add").then((result) => {
                    let responseData:any = result;
                    
                    if(responseData.status == "0"){
                        alert(responseData.status);
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
        }
    }    
}