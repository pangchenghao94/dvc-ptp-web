import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManageINDRoutingModule } from './manage-ind-routing.module';
import { ManageINDComponent } from './manage-ind.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatSortModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule, 
        ManageINDRoutingModule,
        PageHeaderModule,
        FormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        NgbModule.forRoot()
    ],
    declarations: [ManageINDComponent]
})
export class ManageINDModule {}
