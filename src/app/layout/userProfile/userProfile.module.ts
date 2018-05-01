import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';

import { UserProfileRoutingModule } from './userProfile-routing.module';
import { UserProfileComponent } from './userProfile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        LoadingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        NgbModule.forRoot()],
    declarations: [UserProfileComponent]
})
export class UserProfileModule {}
