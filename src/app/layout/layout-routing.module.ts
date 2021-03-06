import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'managePDK' },
            // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },

            { path: 'userProfile', loadChildren: './userProfile/userProfile.module#UserProfileModule' },        
            { path: 'manageUsers', loadChildren: './manage-users/manage-users.module#ManageUsersModule' },
            { path: 'managePDK', loadChildren: './manage-pdk/manage-pdk.module#ManagePDKModule'},
            { path: 'manageIND', loadChildren: './manage-ind/manage-ind.module#ManageINDModule'},   
            { path: 'manageReport', loadChildren: './manage-report/manage-report.module#ManageReportModule'},                                 
            { path: 'generateDailyReport', loadChildren: './generate-daily-report/generate-daily-report.module#GenerateDailyReportModule'},                                             
            { path: 'addEditPDKAssignment/:action/:id', loadChildren: './addEdit-pdkassignment/addEdit-pdkassignment.module#AddEditPDKAssignmentModule' },
            { path: 'viewAssignment/:id', loadChildren: './view-assignment/view-assignment.module#ViewAssignmentModule' },  
            { path: 'viewIND/:id', loadChildren: './view-ind/view-ind.module#ViewINDModule' },
            { path: 'addEditIND/:action/:id', loadChildren: './addEdit-ind/addEdit-ind.module#AddEditINDModule' }                      
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
