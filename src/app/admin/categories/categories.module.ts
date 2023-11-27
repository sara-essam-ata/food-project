import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from 'src/app/sheard/sheard.module';
import { CategoriesService } from './services/categories.service';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';

const routes: Routes = [
  {path:'', component:CategoriesComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule,
  ],
  providers: [
    CategoriesService
  ],
  declarations: [CategoriesComponent,AddEditCategoryComponent]
})
export class CategoriesModule { }
