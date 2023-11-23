import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRecipesComponent } from './userRecipes.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component:UserRecipesComponent},
];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserRecipesComponent]
})
export class UserRecipesModule { }
