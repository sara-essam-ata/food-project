import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesService } from './services/categories.service';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';

const routes: Routes = [
  {path:'', component:CategoriesComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  providers: [
    CategoriesService
  ],
  declarations: [CategoriesComponent,AddEditCategoryComponent]
})
export class CategoriesModule { }
