import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbDateStruct, NgbDateParserFormatter, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { GeneralService, AuthService, CustomNgbDateParseFormatter } from '../../shared';
import { Router } from '@angular/router';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/merge';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'manage-ind',
    templateUrl: './manage-ind.component.html',
    styleUrls: ['./manage-ind.component.scss'],
    animations: [routerTransition()],    
    providers: [{provide: NgbDateParserFormatter, useClass: CustomNgbDateParseFormatter}],
})
export class ManageINDComponent implements OnInit {
    indDate: any;
    displayedColumns = ['ind_id', 'p_shortAddr', 'po_name', 'team', 'full_name', 'issue_date'];
    dataSource: any;
    // assignments: Array<Assignment> = [];    
    // filteredAssignments: Observable<any[]>;
    loading: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // @ViewChild('selectAssignment') selectAssignment: NgbTypeahead;

    // focus_assignment$ = new Subject<string>();
    // click_assignment$ = new Subject<string>();

    // pka_search = (text$: Observable<string>) => text$
    //   .debounceTime(200).distinctUntilChanged()
    //   .merge(this.focus_assignment$)
    //   .merge(this.click_assignment$.filter(() => !this.selectAssignment.isPopupOpen()))
    //   .map(term => (term === '' ? this.assignments : this.assignments.filter(v => v.pka_full_name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10));
    
    // formatter = (x: {pka_full_name: string}) => x.pka_full_name;

    constructor(private general: GeneralService, private auth: AuthService, private router: Router) {
        this.getINDList();
    }

    ngOnInit() {}

    getINDList(){
        this.loading = true;
        this.auth.postData(this.general.getAuthObject(), "api/ind/indList_web").then((result) => {
            this.loading = false;
            let responseData: any = result;

            if(responseData.status == "0"){
                alert(responseData.message);
            }
            else{
                if(responseData.error){
                    console.log(responseData.error.text);
                }
                else{
                    responseData.data.forEach(data => {
                        data.issue_date = this.general.toDateDisplayFormat(data.issue_date);
                    });
                    this.dataSource = new MatTableDataSource(responseData.data);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;                         
                }
            }
        },
        (err) => {
            this.loading = false;
            alert(err.message);            
            console.log("API error: " + JSON.stringify(err));
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    viewIND(ind_id){
        this.router.navigate(['/viewIND', ind_id]);
    }

    filterList(){
        if(this.indDate != null){
            let temp_datetime = this.general.toMySqlDateStr(this.indDate);
            let temp_date = this.general.toDateDisplayFormat(temp_datetime);
            this.applyFilter(temp_date);
        }
        else{
            this.applyFilter("");
        }
    }
}
