import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePDKComponent } from './manage-pdk.component';

const routes: Routes = [
    {
        path: '',
        component: ManagePDKComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagePDKRoutingModule {}
