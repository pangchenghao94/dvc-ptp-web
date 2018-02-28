import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService, GeneralService, Assignment } from '../../shared';
import { Form } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'manage-pdk',
    templateUrl: './manage-pdk.component.html',
    styleUrls: ['./manage-pdk.component.scss'],
    animations: [routerTransition()]    
})
export class ManagePDKComponent implements OnInit {
    displayedColumns = ['assignment_id', 'address', 'team', 'postcode', 'date'];
    dataSource: any;
    dateFilter: string;
    modal: NgbModalRef;
    assignment: Assignment;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private auth : AuthService, private modalService: NgbModal) {
        this.getAssignmentList();
    }

    ngOnInit() {     
    }

    testing(){
        console.log('sdsdsd');
    }

    getAssignmentList(){
        let token:string = JSON.parse(localStorage.getItem('userData')).token;
        let user_id: string = JSON.parse(localStorage.getItem('userData')).user_id;

        let data: any = {   "token"     : token,
                            "user_id"   : user_id };
                
        this.auth.postData(data, "api/assignment/assignmentList").then((result) => {
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
        console.log('open');
        this.assignment = new Assignment();

        let token:string = JSON.parse(localStorage.getItem('userData')).token;
        let user_id: string = JSON.parse(localStorage.getItem('userData')).user_id;
        let data: any = {   "token"     : token,
                            "user_id"   : user_id};

        this.auth.postData(data, "api/assignment/get/" + id).then((result) => {
            let assignment: any = result;
                    
            if(assignment.status == "0"){
                alert(assignment.message);
            }
            else{
                if(assignment.error) {
                    console.log(assignment.error.text);
                }
                else{
                    this.assignment.assignment_id = assignment.data.assignment_id;
                    this.assignment.user_id = assignment.data.user_id;
                    this.assignment.team = assignment.data.team;
                    this.assignment.address = assignment.data.address;
                    this.assignment.remark = assignment.data.remark;
                    
                    this.auth.postData(data, "api/user/getFullName/" + this.assignment.user_id).then((result) => {
                        let full_name: any = result;
                        
                        if(full_name.status == "0"){
                            alert(full_name.message);
                        }
                        else{
                            if(full_name.error) {
                                console.log(full_name.error.text);
                            }
                            else{
                                console.log(full_name);
                                this.assignment.createdBy = full_name.data.full_name;
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

        console.log(JSON.stringify(data));

        this.modal = this.modalService.open(content, {
            backdrop: 'static',
            keyboard: false
        });
    }
}
