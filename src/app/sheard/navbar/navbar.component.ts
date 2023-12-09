import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/admin/users/models/users-admin';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  constructor( 
    private _ProfileService:ProfileService
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
}
