import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReportRoutingModule } from './manage-report-routing.module';
import { ManageReportComponent } from './manage-report.component';

@NgModule({
    imports: [CommonModule, ManageReportRoutingModule],
    declarations: [ManageReportComponent]
})
export class ManageReportModule {}
