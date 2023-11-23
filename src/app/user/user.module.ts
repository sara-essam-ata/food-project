import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from '../sheard/sheard.module';

const routes: Routes = [
  {path:'', component:UserComponent},
  {path:'userRecipes', loadChildren: () => import('./userRecipes/userRecipes.module').then(m => m.UserRecipesModule)},
  {path:'favourites', loadChildren: () => import('./favourites/favourites.module').then(m => m.FavouritesModule)},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule,
  ],
  declarations: [UserComponent]
})
export class UserModule { }
