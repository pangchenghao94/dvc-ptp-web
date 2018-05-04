import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService, GeneralService, User, Assignment } from '../../shared';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'view-assignment',
    templateUrl: './view-assignment.component.html',
    styleUrls: ['./view-assignment.component.scss'],
    animations: [routerTransition()]        
})

export class ViewAssignmentComponent implements OnInit {
    displayedColumns = ['user_id', 'full_name'];
    dataSource: any;
    assignment: Assignment = new Assignment();
    loading: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(private general: GeneralService, private auth: AuthService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
            this.assignment.assignment_id = params['id'];
        });
        this.getAssignment(this.assignment.assignment_id);
    }

    ngOnInit() {}

    getAssignment(id){
        this.loading = true;
        this.auth.postData(this.general.getAuthObject(), "api/assignment/get/" + id).then((result) => {
            let assignmentData: any = result;

            if(assignmentData.status == "0"){
                alert(assignmentData.message);
                this.loading = false;
            }
            else{
                if(assignmentData.error) {
                    alert(assignmentData.error.text);
                    console.log(assignmentData.error.text);
                    this.loading = false;
                }
                else{
                    this.assignment.assignment_id = assignmentData.data.assignment_id;
                    this.assignment.user_id = assignmentData.data.user_id;
                    this.assignment.team = assignmentData.data.team;
                    this.assignment.address = assignmentData.data.address;
                    this.assignment.remark = assignmentData.data.remark;
                    this.assignment.createdBy = assignmentData.data.full_name;
                    this.assignment.date = this.general.toDateDisplayFormat(assignmentData.data.date);
                    this.assignment.pa_full_name = assignmentData.data.pa_full_name;
                    this.assignment.pka_full_name = assignmentData.data.pka_full_name;

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
                                let temp_data: any = [];
                                assignment_admin.data.forEach(element => {
                                    let temp_user : User = new User();
                                    temp_user.user_id = element.user_id;
                                    temp_user.full_name = element.full_name;
            
                                    temp_data.push(temp_user);
                                });

                                this.dataSource = new MatTableDataSource(temp_data);            
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                
                            }
                        }
                        this.loading = false;
                    },
                    (err) => {
                        this.loading = false;
                        console.log(err);
                        this.general.displayErrorAlert("get assignment users list");
                    }); 
                }
            }
        },
        (err) => {
            this.loading = false;
            this.general.displayErrorAlert("get assignment data");
            console.log(err);
        });
    }

    editBtn(){
        this.router.navigate(['/addEditPDKAssignment', '2', this.assignment.assignment_id]);
    }

    deleteBtn(){
        if(confirm("Confirm to delete assignment?")){
            this.loading = true;
            this.auth.postData(this.general.getAuthObject(), "api/assignment/delete/" + this.assignment.assignment_id).then((result) => {
                let responseData: any = result;
                this.loading = false;
                
                if(responseData.status == "0"){
                    alert(responseData.message);
                }
                else{
                    if(responseData.error) {
                        console.log(responseData.error.text);
                    }
                    else{
                        alert("Assignment has been deleted successfully");
                        this.router.navigate(['/managePDK']);
                    }
                }
            },
            (err) => {
                this.loading = false;
                this.general.displayErrorAlert("delete assignment");
                console.log(err);
            });  
        }
    }
}
