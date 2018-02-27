import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePDKRoutingModule } from './manage-pdk-routing.module';
import { ManagePDKComponent } from './manage-pdk.component';
import { PageHeaderModule } from './../../shared';
import { MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSortModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule, 
        ManagePDKRoutingModule,
        PageHeaderModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        NgbModule.forRoot()
    ],
    declarations: [ManagePDKComponent]
})
export class ManagePDKModule {}
