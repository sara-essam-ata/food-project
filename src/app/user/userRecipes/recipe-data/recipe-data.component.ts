import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRecipe } from 'src/app/admin/recipes/models/recipe';
MatDialogRef
@Component({
  selector: 'app-recipe-data',
  templateUrl: './recipe-data.component.html',
  styleUrls: ['./recipe-data.component.scss']
})
export class RecipeDataComponent implements OnInit {
  [x: string]: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IRecipe,
  public dialogRef: MatDialogRef<RecipeDataComponent>
  ) {}
  ngOnInit() {
    console.log(this.data);
    
  }
  onClose(){
    this.dialogRef.close();
   }
}
