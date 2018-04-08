import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewINDComponent } from './view-ind.component';

const routes: Routes = [
    {
        path: '',
        component: ViewINDComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewINDRoutingModule {}
