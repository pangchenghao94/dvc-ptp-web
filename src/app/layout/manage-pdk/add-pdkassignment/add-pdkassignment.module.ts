import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../../shared';

import { AddPDKAssignmentRoutingModule } from './add-pdkassignment-routing.module';
import { AddPDKAssignmentComponent } from './add-pdkassignment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, 
        AddPDKAssignmentRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule, 
        MatPaginatorModule ,
        NgbModule.forRoot()],
    declarations: [AddPDKAssignmentComponent]
})
export class AddPDKAssignmentModule {}
