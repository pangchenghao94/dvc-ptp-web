import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageDailyReportComponent } from './manage-daily-report.component';

const routes: Routes = [
    {
        path: '',
        component: ManageDailyReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageDailyReportRoutingModule {}
