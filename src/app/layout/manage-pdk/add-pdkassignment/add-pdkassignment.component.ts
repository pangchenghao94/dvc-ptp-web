import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { AuthService, User } from '../../../shared';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
    selector: 'add-pdkassignment-page',
    templateUrl: './add-pdkassignment.component.html',
    styleUrls: ['./add-pdkassignment.component.scss'],
    animations: [routerTransition()]        
})
export class AddPDKAssignmentComponent implements OnInit {
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

    constructor(private fb: FormBuilder, private auth: AuthService, private changeDetectorRefs: ChangeDetectorRef) {
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
        }
    }

    submit(){
        if(this.dataSource.data.length == 0)
            this.showNoUser = this.dataSource.data.length > 0 ? false : true;
        else{
            console.log(this.dataSource.data);
            console.log(this.assignmentForm.get('date').value);
            console.log(this.assignmentForm.get('postcode').value);
            console.log(this.assignmentForm.get('team').value);
            console.log(this.assignmentForm.get('address').value);
            console.log(this.assignmentForm.get('remark').value);
        }
    }    
}