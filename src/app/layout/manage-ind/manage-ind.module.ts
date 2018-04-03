import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageINDRoutingModule } from './manage-ind-routing.module';
import { ManageINDComponent } from './manage-ind.component';

@NgModule({
    imports: [CommonModule, ManageINDRoutingModule],
    declarations: [ManageINDComponent]
})
export class ManageINDModule {}
