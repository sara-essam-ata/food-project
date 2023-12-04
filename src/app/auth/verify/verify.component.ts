import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  [x: string]: any;
  verifyForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    code: new FormControl(null,[Validators.required, Validators.pattern('[a-zA-Z0-9]{4}')])
  })
  constructor(
    public dialogRef: MatDialogRef<VerifyComponent>,
    private _AuthService:AuthService,
    private toastr:ToastrService,
    private router:Router
  ){}
  ngOnInit(): void {
  }
  onClose(){
   this.dialogRef.close();
  }
  onSupmit(data: FormGroup){
    console.log(data);
    this._AuthService.onVerifyAccount(data.value).subscribe({
      next:(res) =>{
        console.log(res);
      },
      error:(err) =>{
        this.toastr.error(err.error.message, 'Error!');
      },
      complete:() =>{
        this.onClose();
        this.router.navigate(['/auth/login'])
      }
    })
    this.onClose()
  }
}
