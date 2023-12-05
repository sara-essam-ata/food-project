import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})

export class  AddEditCategoryComponent {

  categoryId:any;
  categoryName:string='';

  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    private _CategoriesService:CategoriesService,
    private _ActivatedRoute:ActivatedRoute
  ) {
    this.categoryId = _ActivatedRoute.snapshot.params['id'];
    if(this.categoryId){
      this.getCategoryById(this.categoryId)
    }

  }
  onClose(){
   this.dialogRef.close();
  }
  getCategoryById(id:number){
      this._CategoriesService.getCategoryById(id).subscribe({
        next:(res:any)=>{
          this.categoryName = res.name;
        },
        error:(err)=>{
          console.log('error');
          
        },
        complete:()=>{          
          console.log(this.categoryName);
          console.log('fie');
          
        }
    })
      }
}
