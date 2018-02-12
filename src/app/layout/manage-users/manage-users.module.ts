import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ManageUsersComponent } from './manage-users.component';
import { PageHeaderModule } from './../../shared';
import { MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule, 
        ManageUsersRoutingModule, 
        PageHeaderModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [ManageUsersComponent]
})
export class ManageUsersModule {
    constructor(){}
}
