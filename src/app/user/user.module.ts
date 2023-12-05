import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from '../sheard/sheard.module';
import { HomeComponent } from '../sheard/home/home.component';
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
    SheardModule,
  ],
  declarations: [UserComponent,RecipeDataComponent]
})
export class UserModule { }
