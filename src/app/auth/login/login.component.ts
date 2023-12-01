import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(private _AuthService:AuthService, private toastr:ToastrService,public dialog: MatDialog,
    private router:Router){}
      hide:boolean=true;
  message='';
  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  });

  onSubmit(data:FormGroup){
    return this._AuthService.onLogin(data.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        localStorage.setItem('userToken',res.token);
        this._AuthService.getProfile()
      },
      error:(err:any)=>{
        this.toastr.error('check your email and password' , 'error!');        
      },
      complete:()=> {
        this.router.navigate(['/dashboard']);
        this.toastr.success('loged in successfully', 'welcome');
      },
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RequestResetPasswordComponent, {
      data: {},
      width: '35%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      this.onResetRequest(result)
      }
    });
  }  

  onResetRequest(data:string){
    this._AuthService.onRequestResetPassword(data).subscribe({
      next:(res:any)=>{
        this.message=res.message;
      },
      error:(err:any)=>{
        this.toastr.error(err.error.message, 'Error!');
        console.log(err.message);
        
      },
      complete:()=> {
        this.toastr.success(this.message, 'welcome');
        this.router.navigate(['/auth/reset-password'])
        localStorage.setItem('email', data)
      },
    })
  }
}

