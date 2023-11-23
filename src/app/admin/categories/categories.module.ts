import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from 'src/app/sheard/sheard.module';

const routes: Routes = [
  {path:'', component:CategoriesComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule,
  ],
  declarations: [CategoriesComponent]
})
export class CategoriesModule { }
