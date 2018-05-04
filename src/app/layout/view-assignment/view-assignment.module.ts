import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAssignmentRoutingModule } from './view-assignment-routing.module';
import { ViewAssignmentComponent } from './view-assignment.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { PageHeaderModule } from '../../shared';
import { LoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        CommonModule, 
        PageHeaderModule,
        ViewAssignmentRoutingModule,
        LoadingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    declarations: [ViewAssignmentComponent]
})
export class ViewAssignmentModule {}
