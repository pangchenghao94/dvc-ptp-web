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
    displayedColumns = ['assignment_id', 'address', 'team', 'postcode', 'date'];
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
            alert(err.message);            
            console.log("API error: " + JSON.stringify(err));
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    // open(content, id: number) {
    //     this.modal = this.modalService.open(content, {
    //         backdrop: 'static',
    //         keyboard: false,
    //         size: 'lg'
    //     });

    //     this.auth.postData(this.general.getAuthObject(), "api/assignment/get/" + id).then((result) => {
    //         let assignmentData: any = result;
                    
    //         if(assignmentData.status == "0"){
    //             alert(assignmentData.message);
    //         }
    //         else{
    //             if(assignmentData.error) {
    //                 console.log(assignmentData.error.text);
    //             }
    //             else{
    //                 this.assignment.assignment_id = assignmentData.data.assignment_id;
    //                 this.assignment.user_id = assignmentData.data.user_id;
    //                 this.assignment.team = assignmentData.data.team;
    //                 this.assignment.address = assignmentData.data.address;
    //                 this.assignment.remark = assignmentData.data.remark;
    //                 this.assignment.createdBy = assignmentData.data.full_name;
    //                 this.assignment.date = this.general.toDateDisplayFormat(assignmentData.data.date);

    //                 this.auth.postData(this.general.getAuthObject(), "api/assignment_admin/getList/" + this.assignment.assignment_id).then((result) => {
    //                     let assignment_admin: any = result;
                                
    //                     if(assignment_admin.status == "0"){
    //                         alert(assignment_admin.message);
    //                     }
    //                     else{
    //                         if(assignment_admin.error) {
    //                             console.log(assignment_admin.error.text);
    //                         }
    //                         else{
    //                             let temp_data: any = [];
    //                             assignment_admin.data.forEach(element => {
    //                                 let temp_user : User = new User();
    //                                 temp_user.user_id = element.user_id;
    //                                 temp_user.full_name = element.full_name;
            
    //                                 temp_data.push(temp_user);
    //                             });
    //                             debugger;
    //                             this.dataSource2 = new MatTableDataSource(temp_data);            
    //                             this.dataSource2._updateChangeSubscription();
    //                             // setTimeout(() => {
    //                             //     this.dataSource.paginator = this.paginator2;
    //                             //     this.dataSource.sort = this.sort2;
    //                             //   });
    //                             this.dataSource2.paginator = this.paginator2;
    //                             this.dataSource2.sort = this.sort2;
                                
    //                         }
    //                     }
    //                 },
    //                 (err) => {
    //                     console.log("API error: " + err);
    //                 }); 
    //             }
    //         }
    //     },
    //     (err) => {
    //         console.log("API error: " + err);
    //     });
    // }

    viewAssignment(assignment_id){
        this.router.navigate(['/viewAssignment', assignment_id]);
    }

}
