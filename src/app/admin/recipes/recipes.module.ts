import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from 'src/app/sheard/sheard.module';

const routes: Routes = [
  {path:'', component:RecipesComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule,
  ],
  declarations: [RecipesComponent]
})
export class RecipesModule { }
