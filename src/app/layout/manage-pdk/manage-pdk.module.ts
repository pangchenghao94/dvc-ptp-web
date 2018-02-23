import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePDKRoutingModule } from './manage-pdk-routing.module';
import { ManagePDKComponent } from './manage-pdk.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, 
        ManagePDKRoutingModule,
        PageHeaderModule],
    declarations: [ManagePDKComponent]
})
export class ManagePDKModule {}
