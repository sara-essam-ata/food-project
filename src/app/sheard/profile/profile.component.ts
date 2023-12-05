import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/admin/users/models/users-admin';
import { UsersAdminService } from 'src/app/admin/users/services/users-admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _UsersAdminService:UsersAdminService
    ) { }
    userData:any;
  ngOnInit() {
    this.getUsersData(this.userData)
  }
  

  getUsersData(data:IUser){
    this._UsersAdminService.getAllUsers(data).subscribe({
      next:(res:IUser)=>{
        this.userData = res
      }
    })
  }
}
