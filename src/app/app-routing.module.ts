import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'', redirectTo:'auth' , pathMatch:'full'},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate:[authGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),AuthModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
