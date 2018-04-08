import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAssignmentComponent } from './view-assignment.component';

const routes: Routes = [
    {
        path: '',
        component: ViewAssignmentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewAssignmentRoutingModule {}
