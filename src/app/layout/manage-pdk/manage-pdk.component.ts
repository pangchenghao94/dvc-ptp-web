import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService, GeneralService, Assignment, User } from '../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'manage-pdk',
    templateUrl: './manage-pdk.component.html',
    styleUrls: ['./manage-pdk.component.scss'],
    animations: [routerTransition()]    
})

export class ManagePDKComponent implements OnInit {
    displayedColumns = ['assignment_id', 'address', 'pka_full_name', 'team', 'postcode', 'date'];
    dataSource: any;
    dataSource2: any;
    dateFilter: string;
    modal: NgbModalRef;
    assignment: Assignment = new Assignment();
    loading: boolean = false;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private auth : AuthService, private general: GeneralService, private router: Router) {
        this.getAssignmentList();
    }

    ngOnInit() {     
    }

    getAssignmentList(){
        this.loading = true;
        this.auth.postData(this.general.getAuthObject(), "api/assignment/assignmentList").then((result) => {
            let responseData: any = result;

            if(responseData.status == "0"){
                alert(responseData.message);
            }
            else{
                if(responseData.error){
                    console.log(responseData.error.text);
                }
                else{
                    responseData.forEach(data => {
                        data.date = this.general.toDateDisplayFormat(data.date);
                    });
                    this.dataSource = new MatTableDataSource(responseData);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            }
            this.loading = false;
        },
        (err) => {
            this.loading = false;
            alert("Fail to get assignment list. Please contact system administrator");            
            console.log(err);
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    viewAssignment(assignment_id){
        this.router.navigate(['/viewAssignment', assignment_id]);
    }

}
