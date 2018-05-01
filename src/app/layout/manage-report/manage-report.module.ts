import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReportRoutingModule } from './manage-report-routing.module';
import { ManageReportComponent } from './manage-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatInputModule } from '@angular/material';
import { LoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        CommonModule, 
        PageHeaderModule,
        LoadingModule,
        ManageReportRoutingModule,
        FormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        NgbModule.forRoot()
    ],
    declarations: [ManageReportComponent]
})
export class ManageReportModule {}
