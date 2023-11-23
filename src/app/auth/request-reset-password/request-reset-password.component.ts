import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent {
 email:string = '';
 constructor(public dialogRef: MatDialogRef<RequestResetPasswordComponent>,){}
 onClose(){
  this.dialogRef.close();
 }
}
