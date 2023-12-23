import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
LoginComponent
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  userEmail=localStorage.getItem('email');
  changePasswordForm = new FormGroup({
  oldPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  newPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  confirmNewPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
});

hide:boolean=true;
hideConfirm:boolean=true;

constructor(private _AuthService:AuthService, private toastr:ToastrService,
   public dialog: MatDialog, private Router:Router){}

  onSubmit(data:FormGroup){
    return this._AuthService.onChangePassword(data.value).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err:any)=>{
        this.toastr.error('check your old password' , 'error!');
        console.log(err.message);        
      },
      complete:()=> {
        this.toastr.success('Log in Now', 'welcome');
        this.Router.navigate(['/auth'])
      },
    })
  }
  
}