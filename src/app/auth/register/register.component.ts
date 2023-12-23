import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { VerifyComponent } from '../verify/verify.component';
import { ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  imgSrc: any;
  hide:boolean=true;
  hideConfirm:boolean=true;
  message='';
  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern('([a-zA-Z]){3,12}([0-9]{1,3})')]),
    email: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    // profileImage: new FormControl(null),
    phoneNumber: new FormControl(null, [Validators.required , Validators.pattern('^(01|01|00201)[0-2,5]{1}[0-9]{8}')]),
    password: new FormControl(null, [Validators.required , Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmPassword: new FormControl(null, [Validators.required , Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  },{validators : this.matchPasswords});

  constructor(
    private _AuthService:AuthService,
    private toastr:ToastrService,
    public dialog: MatDialog    
    ){}

  ngOnInit(): void {
  }
  userEmail:any;

  matchPasswords(form: any | ValidatorFn){
    let pass = form.get(['password']);
    let confirmPass = form.get(['confirmPassword']);
    if(pass?.value == confirmPass?.value){
      return null
    }
    else{
      confirmPass.setErrors({invalid: 'pass & confirmPass not match'})
      return {invalid: 'pass & confirmPass not match'}
    }
  }

  
  onSubmit(data:FormGroup){
    let myData = new FormData();
    let myMap = new Map(Object.entries(data.value));
    for (const [key, val] of myMap) {
      myData.append(key, data.value[key]);
    }
    myData.append('profileImage', this.imgSrc, this.imgSrc['name']);
      return this._AuthService.onRegister(myData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.userEmail = res.email
      },
      error:(err:any)=>{
        this.toastr.error(err.error.message , 'error!');        
      },
      complete:()=> {
        this.openDialog(this.userEmail)
        this.toastr.success('regisrered successfully check your mail', 'verify now');
      },
    })
  }

  
  openDialog(data:any): void {
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: this.userEmail,
      width: '35%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      }
    });
  }  

  files: File[] = [];
  onSelect(event:any) {
    console.log(event);
    this.imgSrc= event.addedFiles[0];
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
