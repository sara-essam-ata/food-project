import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component:FavouritesComponent},
];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FavouritesComponent]
})
export class FavouritesModule { }
