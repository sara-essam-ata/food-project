import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from 'src/app/sheard/sheard.module';

const routes: Routes = [
  {path:'', component:FavouritesComponent},
  {path:'favourites', component:FavouritesComponent},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule,
  ],
  declarations: [FavouritesComponent]
})
export class FavouritesModule { }
