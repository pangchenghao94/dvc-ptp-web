import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbDateStruct, NgbTimeStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService, AuthService, CustomNgbDateParseFormatter } from '../../shared';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from "moment";
import * as XLSX from "xlsx-populate";
import { injectTemplateRef } from '@angular/core/src/render3';

@Component({
    selector: 'generate-daily-report',
    templateUrl: './generate-daily-report.component.html',
    styleUrls: ['./generate-daily-report.component.scss'],
    animations: [routerTransition()],      
    providers: [{provide: NgbDateParserFormatter, useClass: CustomNgbDateParseFormatter}],      
})
export class GenerateDailyReportComponent implements OnInit {
    loading: boolean = false;
    selectAssignment: any;
    assignmentList: any;
    selectedAssignments = [];
    reportDate: any;
    dailyReportForm: FormGroup;
    alertMsg: string;
    alertClose = true;
    reportData: any = [];
    reportData2: any = [];

    constructor(private fb: FormBuilder, private general: GeneralService, private auth: AuthService) {
        this.dailyReportForm = this.fb.group({
            EPID_week: '',
            pemandu1: '',
            pemandu2: '',
            remark: '',
            time_depart: {hour: 9, minute: 0},
            time_start_survey: {hour: 9, minute: 30},
            time_end_survey: {hour: 18, minute: 0},
            time_arrived_office: {hour: 18, minute: 30},
            gps_x: '',
            gps_y: ''
        });
    }

    ngOnInit() {}

    filterDate(){
        if(this.reportDate != null){
            this.loading = true;
             
            let postData = this.general.getAuthObject();

            postData.data = {
                date: this.general.toMySqlDateStr(this.reportDate)
            }

            this.auth.postData(postData, "api/assignment/getListByDate").then((result) => {
                this.loading = false;
                let responseData: any = result;

                if(responseData.error){
                    alert("API error, please contact administrative person.");
                    console.log(responseData.error.text);
                }
                
                else{
                    if(responseData.data.length > 0){
                        this.assignmentList = [];
                        this.selectedAssignments = [];
                        this.assignmentList = responseData.data;
                    }

                    else
                        alert("The selected date have no assignments.")
                }
            },
            (err) => {
                this.loading = false;
                alert("API error, please contact administrative person.");
                console.log("API error: " + err);
            });
        }
    }

    selectingAssignment(){
        this.selectedAssignments.push(this.selectAssignment);
        this.assignmentList = this.assignmentList.filter(item => item != this.selectAssignment);
    }

    removeAssignment(assignment: any){
        this.selectedAssignments = this.selectedAssignments.filter(item =>item != assignment);
        this.assignmentList.push(assignment);
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.assignmentList.filter = filterValue;
    }

    generateReport(){
        if(this.selectedAssignments.length > 0){
            this.loading = true;            
            let postData = this.general.getAuthObject();

            postData.assignment_ids = []
            this.selectedAssignments.forEach(item=>{
                postData.assignment_ids.push(item.assignment_id);
            });

            this.auth.postData(postData, "api/dailyReport/get").then((result) => {
                this.loading = false;
                let responseData: any = result;

                if(responseData.error){
                    alert("API error, please contact administrative person.");
                    console.log(responseData.error.text);
                }
                
                else{
                    if(responseData.data.length > 0){
                        this.reportData  = [];
                        this.reportData2 = [];
                        var counter = 0;

                        this.reportData = JSON.parse(JSON.stringify(this.selectedAssignments));
                        for(let i = 0; i < this.reportData.length; i++){
                            let item = this.reportData[i];
                            item.data = responseData.data.filter(item2 => item2.assignment_id == item.assignment_id)[0];
                            item.data2 = responseData.data2.filter(item3 => item3.assignment_id == item.assignment_id)[0];
                        }
                        
                        var url = "assets/report_templates/PEMERIKSAAN_PENGUATKUASAAN_APSPP.xlsx";

                        var req = new XMLHttpRequest();
                        req.open("GET", url, true);
                        req.responseType = "arraybuffer";
                        req.onreadystatechange = () => {
                            if (req.readyState === 4 && req.status === 200){
                                XLSX.fromDataAsync(req.response)
                                    .then((workbook) => {
                                        var sheet = workbook.sheet("Sheet1");
                                        sheet = this.reportLogic(sheet);
                                        this.downloadReport(workbook);
                                    });
                            }
                        };
                        req.send();
                    }

                    else
                        alert("There is now rows for this report!")
                }
            },
            (err) => {
                this.loading = false;
                alert("API error, please contact administrative person.");
                console.log("API error: " + err);
            });
        }
        else{
            alert("Please select at least one assignment to generate daily report.");
        }

    }

    reportLogic(sheet){
        //general fields
        sheet.row(1).cell(14).value(this.reportDate.day + "/" + this.reportDate.month + "/" + this.reportDate.year);
        sheet.row(1).cell(14).style('horizontalAlignment', 'left');

        sheet.row(1).cell(20).value(this.dailyReportForm.get('EPID_week').value);
        sheet.row(1).cell(20).style('horizontalAlignment', 'left');

        sheet.row(19).cell(7).value(this.dailyReportForm.get('pemandu1').value);
        sheet.row(19).cell(7).style('horizontalAlignment', 'left');

        sheet.row(21).cell(7).value(this.dailyReportForm.get('pemandu2').value);
        sheet.row(21).cell(7).style('horizontalAlignment', 'left');

        sheet.row(18).cell(14).value(this.dailyReportForm.get('remark').value);
        sheet.row(18).cell(14).style('horizontalAlignment', 'left');

        let time_depart = this.dailyReportForm.get('time_depart').value;
        time_depart = moment({ hour:time_depart.hour, minute:time_depart.minute })
        sheet.row(18).cell(4).value(time_depart.format("h:mm a"));
        sheet.row(18).cell(4).style('horizontalAlignment', 'left');

        let time_start_survey = this.dailyReportForm.get('time_start_survey').value;
        time_start_survey = moment({ hour:time_start_survey.hour, minute:time_start_survey.minute })
        sheet.row(19).cell(4).value(time_start_survey.format("h:mm a"));
        sheet.row(19).cell(4).style('horizontalAlignment', 'left');

        let time_end_survey = this.dailyReportForm.get('time_end_survey').value;
        time_end_survey = moment({ hour:time_end_survey.hour, minute:time_end_survey.minute })
        sheet.row(20).cell(4).value(time_end_survey.format("h:mm a"));
        sheet.row(20).cell(4).style('horizontalAlignment', 'left');

        let time_arrived_office = this.dailyReportForm.get('time_arrived_office').value;
        time_arrived_office = moment({ hour:time_arrived_office.hour, minute:time_arrived_office.minute })
        sheet.row(21).cell(4).value(time_arrived_office.format("h:mm a"));
        sheet.row(21).cell(4).style('horizontalAlignment', 'left');

        //pka, pa and address field
        var counter = 4; 
        this.reportData.forEach(item => {
            sheet.row(counter).cell(3).value(item.pka_full_name);
            sheet.row(counter).cell(7).value(item.address);            
            sheet.row(counter+1).cell(3).value(item.pa_full_name);

            if(item.data){
                sheet.row(counter).cell(8).value(item.data.visited);
                sheet.row(counter).cell(9).value(item.data.checked);
                sheet.row(counter).cell(10).value(item.data.close);
                sheet.row(counter).cell(11).value(item.data.empty);
                sheet.row(counter).cell(12).value(item.data.premise_positive_compound);
                sheet.row(counter).cell(13).value(item.data2 ? item.data2.container_positive_compound : '0');
                sheet.row(counter).cell(14).value(item.data.area_positive_surrounding);
                sheet.row(counter).cell(15).value(item.data.container_positive_surrounding);
                sheet.row(counter).cell(16).value(item.data.total_breeding);
                sheet.row(counter).cell(17).value(item.data.total_pot_breeding);
                sheet.row(counter).cell(18).value(item.data.total_abating);
                sheet.row(counter).cell(19).value(item.data.abating_amount_g);
                sheet.row(counter).cell(20).value(item.data.s8 + item.data.s5);
                sheet.row(counter).cell(21).value(item.data.ACD);
            }
            counter += 2;
        });

        return sheet;
    }

    downloadReport(workbook){
        workbook.outputAsync("base64")
            .then((base64) => {
                fetch("data:" + XLSX.MIME_TYPE + ";base64," + base64)
                .then(res => res.blob())
                .then(blob => {
                    let data: any = blob
                    let file: File = new File([data], "dailyReport.xlsx");
                    let postData = new FormData();
                    let auth_data = this.general.getAuthObject();

                    var temp_date = new Date();
                    var created_date = (this.general.toMySqlDateStr({year: temp_date.getFullYear(), month: temp_date.getMonth()+1, day: temp_date.getDate()})).split(" ")[0];

                    postData.append("token", auth_data.token);
                    postData.append("user_id", auth_data.user_id);
                    postData.append("created_date", created_date);                    
                    postData.append("file", file); 

                    this.auth.postData2(postData, "api/upload/daily_report").then((result) => {
                        let responseData: any = result;
                        this.loading = false
                    },
                    (err) => {
                        this.loading = false;
                        alert("API error, please contact administrative person.");
                        console.log(err);
                        throw new Error("Fail to upload daily report");
                    });
                });

                //download Report
                var link = document.createElement("a");    
                link.href = "data:" + XLSX.MIME_TYPE + ";base64," + base64;
                link.download = "dailyReport.xlsx";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }
}

