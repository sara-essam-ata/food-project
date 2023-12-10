import { Component, OnInit } from '@angular/core';
import { IUser } from '../admin/users/models/users-admin';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _ProfileService:ProfileService
    ) { }
    currentUser:IUser|any;
  ngOnInit() {
    this.getCurrentUser()
    
  }

  getCurrentUser(){
    this._ProfileService.getCurrentUser().subscribe({
      next:(res)=>{
        this.currentUser = res
        console.log(this.currentUser);
      },error:(err)=>{
        console.log(err);
      },
      complete:()=>{}
    })
  }

}
