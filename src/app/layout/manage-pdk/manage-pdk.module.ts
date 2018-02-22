import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePDKRoutingModule } from './manage-pdk-routing.module';
import { ManagePDKComponent } from './manage-pdk.component';
import { PageHeaderModule } from './../../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, 
        ManagePDKRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        NgbModule.forRoot()],
    declarations: [ManagePDKComponent]
})
export class ManagePDKModule {}
