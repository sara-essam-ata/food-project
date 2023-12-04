import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Routes, RouterModule } from '@angular/router';
import { SheardModule } from '../sheard/sheard.module';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path:'', redirectTo:'login' , pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'register',component:RegisterComponent}

];


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    RequestResetPasswordComponent,
    ChangePasswordComponent,
    RegisterComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule,
  ],
  exports: []
})
export class AuthModule { }
