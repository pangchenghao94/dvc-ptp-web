import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';

import { UserProfileRoutingModule } from './userProfile-routing.module';
import { UserProfileComponent } from './userProfile.component';

@NgModule({
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        PageHeaderModule],
    declarations: [UserProfileComponent]
})
export class UserProfileModule {}
