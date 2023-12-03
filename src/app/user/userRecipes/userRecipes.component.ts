import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRecipeTable, IRecipe, ITag, ICategory } from 'src/app/admin/recipes/models/recipe';
import { RecipeService } from 'src/app/admin/recipes/services/recipe.service';
import { HelperService } from 'src/app/services/helper.service';
import { DeleteComponent } from 'src/app/sheard/delete/delete.component';
import { RecipeDataComponent } from './recipe-data/recipe-data.component';

@Component({
  selector: 'app-userRecipes',
  templateUrl: './userRecipes.component.html',
  styleUrls: ['./userRecipes.component.scss']
})

export class UserRecipesComponent implements OnInit {

  tableResponse: IRecipeTable | undefined;
  tableData: IRecipe[] = [];
  pageSize = 10;
  pageNumber = 1;
  tagId = 0;
  categoryId = 0;
  tags: ITag[] = [];
  categories: ICategory[]=[];
  searchValue = '';
  recipeData: any;

  constructor(
    private _RecipeService: RecipeService,
    private _HelperService: HelperService,
    private _ToastrService: ToastrService,
    private Router:Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAlltags();
    this.getAllCategories();
    this.getTableData();
  }

  getTableData() {
    const params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue,
      tagId: this.tagId,
    };
    this._RecipeService.getRecipes(params).subscribe({
      next: (res: IRecipeTable) => {
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data || [];
        console.log(this.tableResponse);
      }
    });
  }

  getAlltags() {
    this._HelperService.getTags().subscribe({
      next: (res: ITag[]) => {
        console.log(res);
        this.tags = res;
        console.log(this.tags);
      }
    });
  }

  getAllCategories(){
    this._HelperService.getCategories().subscribe({
      next:(res)=>{
        this.categories = res.data;
        console.log(this.categories);
        
      }
    })
  }


  openDialog(recipeItem:IRecipe) {
    this.dialog.open(RecipeDataComponent, {
      data: recipeItem,
      width: '40%'
      
      },

    );
  }
  handlePageEvent(e: PageEvent) {
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getTableData();
  }

 

  
}
