import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDailyReportRoutingModule } from './manage-daily-report-routing.module';
import { ManageDailyReportComponent } from './manage-daily-report.component';
import { PageHeaderModule } from '../../shared';
import { LoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule, 
        PageHeaderModule,
        LoadingModule,    
        FormsModule,   
        ReactiveFormsModule,     
        MatSelectModule,    
        ManageDailyReportRoutingModule,
        NgbModule.forRoot()        
    ],
    declarations: [ManageDailyReportComponent]
})
export class ManageDailyReportModule {}
