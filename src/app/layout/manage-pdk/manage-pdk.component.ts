import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService, GeneralService, Assignment, User } from '../../shared';
import { Form } from '@angular/forms';
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
    displayedColumns2 = ['user_id', 'full_name'];
    dataSource: any;
    dataSource2: any;
    dateFilter: string;
    modal: NgbModalRef;
    assignment: Assignment = new Assignment();
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator) paginator2: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatSort) sort2: MatSort;    

    constructor(private auth : AuthService, private modalService: NgbModal, private general: GeneralService, private router: Router) {
        this.getAssignmentList();
    }

    ngOnInit() {     
    }

    getAssignmentList(){
        this.auth.postData(this.general.getAuthObject(), "api/assignment/assignmentList").then((result) => {
            let responseData: any = result
            if(responseData.status == "0"){
                alert(responseData.message);
            }
            else{
                if(responseData.error){
                    console.log(responseData.error.text);
                }
                else{
                    this.dataSource = new MatTableDataSource(responseData);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            }
                
        },
        (err) => {
            console.log("API error: " + err);
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    open(content, id: number) {
        this.auth.postData(this.general.getAuthObject(), "api/assignment/get/" + id).then((result) => {
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
                    this.assignment.createdBy = assignmentData.data.full_name;

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
                                this.dataSource2 = new MatTableDataSource();
                                assignment_admin.data.forEach(element => {
                                    let temp_user : User = new User();
                                    temp_user.user_id = element.user_id;
                                    temp_user.full_name = element.full_name;
            
                                    this.dataSource2.data.push(temp_user);
                                });
            
                                this.dataSource2._updateChangeSubscription();
                                this.dataSource2.paginator = this.paginator2;
                                this.dataSource2.sort = this.sort2;
                            }
                        }
                    },
                    (err) => {
                        console.log("API error: " + err);
                    }); 
                }
            }
        },
        (err) => {
            console.log("API error: " + err);
        });

        this.modal = this.modalService.open(content, {
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        });
    }

    editBtn(){
        this.modal.close();
        this.router.navigate(['/addEditPDKAssignment', '2', this.assignment.assignment_id]);
    }

    deleteBtn(){
        if(confirm("Confirm to delete assignment?")){
            this.auth.postData(this.general.getAuthObject(), "api/assignment/delete/" + this.assignment.assignment_id).then((result) => {
                let responseData: any = result;
                
                if(responseData.status == "0"){
                    alert(responseData.message);
                }
                else{
                    if(responseData.error) {
                        console.log(responseData.error.text);
                    }
                    else{
                        alert("Assignment has been deleted successfully");
                        this.modal.close();
    
                        let id : number = this.assignment.assignment_id;
                        this.dataSource.data = this.dataSource.data.filter(function(el){
                            return el.assignment_id != id;
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
}
