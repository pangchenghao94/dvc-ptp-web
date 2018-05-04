import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { GeneralService, AuthService, CustomNgbDateParseFormatter, Assignment } from '../../shared';

@Component({
    selector: 'manage-report',
    templateUrl: './manage-report.component.html',
    styleUrls: ['./manage-report.component.scss'],
    animations: [routerTransition()],
    providers: [{provide: NgbDateParserFormatter, useClass: CustomNgbDateParseFormatter}],    
})

export class ManageReportComponent implements OnInit {
    displayedColumns = ['daily_report_id', 'created_by', 'created_date', 'action'];    
    loading: boolean = false;
    dataSource: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private general: GeneralService, private auth: AuthService) {
        this.getReportList();
    }

    ngOnInit() {}

    getReportList(){
        this.loading = true;
        this.auth.postData(this.general.getAuthObject(), "api/dailyReport/getList").then((result) => {
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
                    this.dataSource = new MatTableDataSource(responseData.data);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;                         
                }
            }
        },
        (err) => {
            this.loading = false;
            this.general.displayErrorAlert("get report list");
            console.log(err);
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    deleteReport(item){
        if(confirm("Confirm to delete this daily report?")){
            this.loading = true;
            
            let postData = this.general.getAuthObject();
            postData.daily_report_id = item.daily_report_id;
            postData.s3_path = item.s3_path;
            postData.created_date = item.created_date;

            this.auth.postData(postData, "api/dailyReport/delete").then((result) => {
                let responseData: any = result;

                if(responseData.status == "0"){
                    alert(responseData.error);
                }
                else{
                    if(responseData.error){
                        console.log(responseData.error.text);
                    }
                    else{       
                        alert("Successfully deleted the report.");
                        this.dataSource.data = this.dataSource.data.filter( item =>item.daily_report_id != postData.daily_report_id );             
                    }
                }
                this.loading = false;                
            },
            (err) => {
                this.loading = false;
                this.general.displayErrorAlert("delete report");
                console.log(err);
            });
        }
    }

    downloadReport(item){
        this.loading = true;
        let postData = this.general.getAuthObject();
        postData.s3_path = item.s3_path;
        postData.created_date = item.created_date;
        console.log(postData);

        this.auth.postData(postData, "api/getDailyReport").then((result) => {
            let responseData: any = result;

            if(responseData.status == "0"){
                alert(responseData.error);
            }
            else{
                if(responseData.error){
                    console.log(responseData.error.text);
                }
                else{       
                    window.location.href = responseData.daily_report_uri;
                }
            }
            this.loading = false;
        },
        (err) => {
            this.loading = false;
            console.log(err);
        });
    }
}
