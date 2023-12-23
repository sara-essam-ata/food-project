import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/admin/users/models/users-admin';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { LogoutComponent } from '../logout/logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  constructor( 
    private _ProfileService:ProfileService,
    public dialog: MatDialog
   ){}
  ngOnInit() {
    this.getCurrentUser()
  }
  userName=localStorage.getItem('userName');
  getCurrentUser(){
    this._ProfileService.getCurrentUser().subscribe({
      next:(res)=>{
        this.currentUser = res
        console.log(this.currentUser);
      }
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: {},
      width: '35%'
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
      }
    });
  }  
  openLogoutDialog(): void{
   const dialogRef = this.dialog.open(LogoutComponent, {
     data: {},
     width: '25%'
   });
 
   dialogRef.afterClosed().subscribe(result => {
     if(result){
       
     }
   });
 }  
}
