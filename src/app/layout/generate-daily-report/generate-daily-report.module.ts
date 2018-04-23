import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateDailyReportRoutingModule } from './generate-daily-report-routing.module';
import { GenerateDailyReportComponent } from './generate-daily-report.component';
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
        GenerateDailyReportRoutingModule,
        NgbModule.forRoot()        
    ],
    declarations: [GenerateDailyReportComponent]
})
export class GenerateDailyReportModule {}
