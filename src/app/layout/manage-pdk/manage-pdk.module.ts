import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePDKRoutingModule } from './manage-pdk-routing.module';
import { ManagePDKComponent } from './manage-pdk.component';
import { PageHeaderModule } from './../../shared';
import { MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule, 
        ManagePDKRoutingModule,
        PageHeaderModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule
    ],
    declarations: [ManagePDKComponent]
})
export class ManagePDKModule {}
