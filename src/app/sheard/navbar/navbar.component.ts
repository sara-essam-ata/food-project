import { Component, OnInit } from '@angular/core';
import { UsersAdminService } from 'src/app/admin/users/services/users-admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private _UsersAdminService:UsersAdminService,
  ){}
  ngOnInit() {
  this.getUsersImage(this.userImage)    
  }
  userName=localStorage.getItem('userName');
  userImage:any;
  
  getUsersImage(data:any){
    this._UsersAdminService.getAllUsers(data).subscribe({
      next:(res)=>{
        this.userImage= `https:/upskilling.eg1.com/${res.imagePath}`;
      }
    })
  }

}
