import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatPaginator, MatTableDataSource } from '@angular/material';

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
    date: {year: number, month: number};
    assignmentForm: FormGroup;
    users: Array<User> = [];    
    //selectUserCtrl: FormControl;
    filteredUsers: Observable<any[]>;
    displayedColumns = ['user_id', 'full_name', 'action'];
    dataSource: any;
    
    //selectedRowIndex: number = -1;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private fb: FormBuilder, private auth: AuthService) {}

    ngOnInit() {
        this.assignmentForm = this.fb.group({
            date: ['',Validators.required],
            postcode: ['', [Validators.requiredTrue, Validators.pattern("^[0-9]{10,12}$")]],
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

        //initiate userlist datatable
        let tempuser: User = new User();

        tempuser.user_id=1;
        tempuser.full_name="sdfsddsf";     
        
        let templist: User[] = [tempuser,tempuser];
        console.log(templist);
        this.dataSource = new MatTableDataSource(templist);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
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
        console.log(user_id);
    }

    submit(){}    
}
