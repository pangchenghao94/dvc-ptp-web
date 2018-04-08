import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditINDRoutingModule } from './addEdit-ind-routing.module';
import { AddEditINDComponent } from './addEdit-ind.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared';
import { LoadingModule } from 'ngx-loading';
import { ReactiveFormsModule } from '@angular/forms';
import { FileInputAccessorModule } from "file-input-accessor";

@NgModule({
    imports: [
        CommonModule, 
        AddEditINDRoutingModule,
        PageHeaderModule,
        LoadingModule,
        ReactiveFormsModule,
        FileInputAccessorModule,
        NgbModule.forRoot()
    ],
    declarations: [AddEditINDComponent]
})
export class AddEditINDModule {}
