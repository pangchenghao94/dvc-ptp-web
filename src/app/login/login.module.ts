import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        CommonModule, 
        LoginRoutingModule, 
        FormsModule,
        LoadingModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
