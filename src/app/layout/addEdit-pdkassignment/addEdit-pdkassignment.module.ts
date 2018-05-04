import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';

import { AddEditPDKAssignmentRoutingModule } from './addEdit-pdkassignment-routing.module';
import { AddEditPDKAssignmentComponent } from './addEdit-pdkassignment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';

@NgModule({
    imports: [CommonModule, 
        AddEditPDKAssignmentRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule, 
        MatPaginatorModule,
        NgbModule.forRoot()],
    declarations: [AddEditPDKAssignmentComponent]
})
export class AddEditPDKAssignmentModule {}
