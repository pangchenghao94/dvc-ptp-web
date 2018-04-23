import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateDailyReportComponent } from './generate-daily-report.component';

const routes: Routes = [
    {
        path: '',
        component: GenerateDailyReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GenerateDailyReportRoutingModule {}
