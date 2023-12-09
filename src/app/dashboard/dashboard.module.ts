import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../guards/admin.guard';
import { userGuard } from '../guards/user.guard';
import { HomeComponent } from '../shared/home/home.component';

const routes: Routes = [
  {path:'', component:DashboardComponent, children:[
      {path: '', redirectTo:'home', pathMatch:'full'},
      {path: 'home', component:HomeComponent},
      {path: 'admin', canActivate:[adminGuard], loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)},
      {path: 'user', canActivate:[userGuard], loadChildren: () => import('../user/user.module').then(m => m.UserModule)},
      {path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)},

    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
