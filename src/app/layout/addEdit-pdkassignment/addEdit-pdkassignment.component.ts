import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatPaginator, MatTableDataSource, MatAutocompleteTrigger } from '@angular/material';
import { NgbDateStruct, NgbDateParserFormatter, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { AuthService, User, Assignment, GeneralService, CustomNgbDateParseFormatter } from '../../shared';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as $ from 'jquery';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    providers: [{provide: NgbDateParserFormatter, useClass: CustomNgbDateParseFormatter}],
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
    fullNameList: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;

    @ViewChild('paSelect') paSelect: NgbTypeahead;
    @ViewChild('pkaSelect') pkaSelect: NgbTypeahead;   

    focus_pa$ = new Subject<string>();
    focus_pka$ = new Subject<string>();
    click_pa$ = new Subject<string>();
    click_pka$ = new Subject<string>();

    pka_search = (text$: Observable<string>) => text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus_pka$)
      .merge(this.click_pka$.filter(() => !this.pkaSelect.isPopupOpen()))
      .map(term => (term === '' ? this.users : this.users.filter(v => v.full_name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10));

    pa_search = (text$: Observable<string>) => text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus_pa$)
      .merge(this.click_pa$.filter(() => !this.paSelect.isPopupOpen()))
      .map(term => (term === '' ? this.users : this.users.filter(v => v.full_name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10));
      
    formatter = (x: {full_name: string}) => x.full_name;
    
    constructor(private fb: FormBuilder, private auth: AuthService, private changeDetectorRefs: ChangeDetectorRef, 
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
            selectUserCtrl: '',
            pka: ['', Validators.required],
            pa: ''

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
                        this.assignment.postcode = assignmentData.data.postcode; 
                        this.assignment.pka = assignmentData.data.pka;
                        this.assignment.pka_full_name = assignmentData.data.pka_full_name;                        
                        this.assignment.pa = assignmentData.data.pa;
                        this.assignment.pa_full_name = assignmentData.data.pa_full_name;                        

                        console.log(assignmentData);
                        console.log(this.assignment);
                        let temp_pa: User = new User();
                        temp_pa.user_id = this.assignment.pa;
                        temp_pa.full_name = this.assignment.pa_full_name;

                        let temp_pka: User = new User();
                        temp_pka.user_id = this.assignment.pka;
                        temp_pka.full_name = this.assignment.pka_full_name;

                        //fetch user data to form for edit
                        this.assignmentForm.patchValue({
                            date: this.general.toNgbDateStruct(this.assignment.date),
                            postcode: this.assignment.postcode,
                            team: this.assignment.team,
                            address: this.assignment.address,
                            remark: this.assignment.remark,
                            pa: temp_pa,
                            pka: temp_pka
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
            this.assignment.date = this.general.toMySqlDateStr(this.assignmentForm.get('date').value);
            this.assignment.postcode = this.assignmentForm.get('postcode').value;
            this.assignment.remark = this.assignmentForm.get('remark').value;
            this.assignment.address = this.assignmentForm.get('address').value;
            this.assignment.pka = (this.assignmentForm.get('pka').value).user_id;
            this.assignment.pa = (this.assignmentForm.get('pa').value).user_id;            
            
            let user_id_lst = new Array<string>();
            this.dataSource.data.forEach(element => {
                user_id_lst.push(element.user_id);
            });

            let data: any = this.general.getAuthObject();
            data["data"] = this.assignment;
            data["data2"] = user_id_lst;

            console.log(data);
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
                    console.log(err);
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