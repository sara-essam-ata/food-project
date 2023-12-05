import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent {
  userEmail=localStorage.getItem('email');
  resetForm = new FormGroup({
  email: new FormControl(this.userEmail,[Validators.required,Validators.email]),
  password: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  confirmPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  seed: new FormControl(null,[Validators.required, Validators.pattern('[a-zA-Z0-9]{4}')]),
});

hide:boolean=true;
hideConfirm:boolean=true;

constructor(private _AuthService:AuthService, private toastr:ToastrService,
   public dialog: MatDialog, private Router:Router){}

  onSubmit(data:FormGroup){
    return this._AuthService.onResetPassword(data.value).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err:any)=>{
        this.toastr.error('check your email and password' , 'error!');
        console.log(err.message);
      },
      complete:()=> {
        this.toastr.success('loged in successfully', 'welcome');
      },
    })
  }
}
