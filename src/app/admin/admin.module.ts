import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../shared/home/home.component';
const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  {path:'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path:'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,

  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
