import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})

export class  AddEditCategoryComponent {
  constructor(public dialogRef: MatDialogRef<AddEditCategoryComponent>, private _CategoriesService:CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) {}
  
  categoryName:string='';
  
  onClose(){
   this.dialogRef.close();
  }

  
}