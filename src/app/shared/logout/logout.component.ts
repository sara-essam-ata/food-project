import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  router: any;

  constructor( public dialogRef: MatDialogRef<LogoutComponent>,
    private Router:Router
     ) {}

  ngOnInit(){
  }
  onClose(){
   this.dialogRef.close();
  }
  logOut(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('email');
    localStorage.removeItem('loglevel')
    this.Router.navigate(['/auth'])
  }
}
