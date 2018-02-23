import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPDKAssignmentComponent } from './add-pdkassignment.component';

const routes: Routes = [
    {
        path: '',
        component: AddPDKAssignmentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddPDKAssignmentRoutingModule {}
