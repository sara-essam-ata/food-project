import { Component, OnInit } from '@angular/core';
import { ICategory } from '../categories/models/category';
import { RecipeService } from './services/recipe.service';
import { IRecipeData, IRecipeTable, IRecipeTag } from './models/recipe';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private RecipeService:RecipeService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // tableResponse: IRecipeTable | undefined ;
  // tableData: IRecipeData[] | undefined =[];
  // tableTag: IRecipeTag[] |undefined=[];

  // pageSize:number=10;
  // pageNumber:number=1;
  // ngOnInit() {
  //   this.getTableData();
  //   }
  // getTableData(){
  //   let prams ={
  //     pageSize : this.pageSize,
  //     pageNumber: this.pageNumber
  //   };
      
  //   this.RecipeService.getRecipes(prams).subscribe({
  //     next: (res) =>{
  //       this.tableResponse = res;
  //       this.tableData = this.tableResponse?.data
        
  //       console.log(this.tableResponse);    
  //     }
  //   })
  // }
  // handlePageEvent(e: PageEvent) {
  //   // this.pageEvent = e;
  //   // this.length = e.length;
  //   // this.pageSize = e.pageSize;
  //   // this.pageIndex = e.pageIndex;
  // }
}
