import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../shared/home/home.component';
import { RecipeDataComponent } from './userRecipes/recipe-data/recipe-data.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'recipes', loadChildren: () => import('./userRecipes/userRecipes.module').then(m => m.UserRecipesModule)},
  {path:'favourites', loadChildren: () => import('./favourites/favourites.module').then(m => m.FavouritesModule)},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [UserComponent,RecipeDataComponent]
})
export class UserModule { }
