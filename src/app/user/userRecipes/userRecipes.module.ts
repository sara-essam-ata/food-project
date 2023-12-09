import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRecipesComponent } from './userRecipes.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {path:'', component:UserRecipesComponent},
  {path:'recipe', component:UserRecipesComponent},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [UserRecipesComponent]
})
export class UserRecipesModule { }
