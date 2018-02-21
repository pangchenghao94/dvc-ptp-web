import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePDKRoutingModule } from './manage-pdk-routing.module';
import { ManagePDKComponent } from './manage-pdk.component';
import { PageHeaderModule } from './../../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, 
        ManagePDKRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        NgbModule],
    declarations: [ManagePDKComponent]
})
export class ManagePDKModule {}
