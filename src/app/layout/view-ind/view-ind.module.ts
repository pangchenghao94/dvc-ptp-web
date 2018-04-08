import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewINDRoutingModule } from './view-ind-routing.module';
import { ViewINDComponent } from './view-ind.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule, 
        ViewINDRoutingModule,
        LoadingModule,
        NgbModule.forRoot(),
    ],
    declarations: [ViewINDComponent]
})
export class ViewINDModule {}
