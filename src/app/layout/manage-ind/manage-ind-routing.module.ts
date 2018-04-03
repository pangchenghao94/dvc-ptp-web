import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageINDComponent } from './manage-ind.component';

const routes: Routes = [
    {
        path: '',
        component: ManageINDComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageINDRoutingModule {}
