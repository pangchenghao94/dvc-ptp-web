import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditINDComponent } from './addEdit-ind.component';

const routes: Routes = [
    {
        path: '',
        component: AddEditINDComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddEditINDRoutingModule {}
