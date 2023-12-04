import { Component, OnInit} from '@angular/core';
import { ICategory, IRecipe, IRecipeTable, ITag } from './models/recipe';
import { RecipeService } from './services/recipe.service';
import { PageEvent } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/sheard/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
AddEditRecipeComponent
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  tableResponse: IRecipeTable | undefined;
  tableData: IRecipe[] = [];
  pageSize = 10;
  pageNumber = 1;
  tagId = 0;
  categoryId = 0;
  tags: ITag[] = [];
  categories: ICategory[] = [];
  searchValue = '';
  recipeData: any;
  recipeForm: any;

  constructor(
    private _RecipeService: RecipeService,
    private _HelperService: HelperService,
    private dialog: MatDialog,
    private _ToastrService: ToastrService,
    private Router:Router
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
      next: (res)=>{
        this.categories = res.data;
        console.log(this.categories);
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.getTableData();
  }
 
  // Delete
  openDeleteDialog(recipeData: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: recipeData,
      width: '30%'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result.id);
        this.onDeleteRecipe(result.id);
        this.Router.navigate(['/dashboard/admin/recipes'])
      }
    });
  }

  onDeleteRecipe(id: number) {
    this._RecipeService.deleteRecipe(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error('Error');
      },
      complete: () => {
        this.getTableData();
        this._ToastrService.success('Recipe deleted', 'Success');
      }
    });
  }
  
}