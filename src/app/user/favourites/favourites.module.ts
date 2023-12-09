import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {path:'', component:FavouritesComponent},
  {path:'favourites', component:FavouritesComponent},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [FavouritesComponent]
})
export class FavouritesModule { }
