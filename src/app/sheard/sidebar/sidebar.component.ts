import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AuthService } from 'src/app/auth/services/auth.service';

interface IMenu{
  title:string,
  icon:string,
  link:string,
  isActive:Boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private _AuthService:AuthService, private router:Router,
    private toastr:ToastrService,public dialog: MatDialog) { }
 isOpened:boolean=true;
 ngOnInit() {
 }
 isAdmin() : boolean {
   return this._AuthService.role == 'SuperAdmin'? true : false;
 }
 isUser() : boolean {
   return this._AuthService.role == 'SystemUser'? true : false;
 }
 menu:IMenu[]=[
   {
     title: 'Home',
     icon: 'fa-solid fa-house',
     link: '/dashboard/home',
     isActive: this.isAdmin() || this.isUser()
   },
   {
     title: 'Users',
     icon: 'fa-solid fa-users',
     link: '/dashboard/admin/users',
     isActive: this.isAdmin()
   },
   {
     title: 'Recipes',
     icon: 'fa-solid fa-bowl-food',
     link: '/dashboard/admin/recipes',
     isActive: this.isAdmin()
   },
   {
     title: 'Categories',
     icon: 'fa-solid fa-calendar-day',
     link: '/dashboard/admin/categories',
     isActive: this.isAdmin()
   },
   {
     title: 'userRecipes',
     icon: 'fa-solid fa-calendar-day',
     link: '/dashboard/user/userRecipes',
     isActive: this.isUser()
   },
   {
     title: 'favourites',
     icon: 'fa-solid fa-calendar-day',
     link: '/dashboard/user/favourites',
     isActive: this.isUser()
   }
 ]
 logOut(){
   localStorage.removeItem('userToken');
   localStorage.removeItem('role');
   localStorage.removeItem('userName');
   this.router.navigate(['/auth'])

 }
 openDialog(): void {
   const dialogRef = this.dialog.open(ChangePasswordComponent, {
     data: {},
     width: '50%'
   });

   dialogRef.afterClosed().subscribe(result => {
     if(result){
       
     }
   });
 }  
}
