import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRecipeTable, IRecipe, ITag, ICategory } from 'src/app/admin/recipes/models/recipe';
import { RecipeService } from 'src/app/admin/recipes/services/recipe.service';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeDataComponent } from './recipe-data/recipe-data.component';
import { FavouriteService } from '../favourites/services/favourite.service';

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
    private Router:Router,
    private _ToastrService:ToastrService,
    public dialog: MatDialog,
    private _FavouriteService:FavouriteService
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
      categoryId: this.categoryId
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
    const dialogRef = this.dialog.open(RecipeDataComponent, {
      data: recipeItem,
      width: '40%'
      },
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.addToFav(result);
      }
    });
  }

  addToFav(id:number){
    this._FavouriteService.onAddToFav(id).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        this._ToastrService.error('failed to add favourite', 'Error!');
      },
      complete:()=>{
        this._ToastrService.success('recipe added to favourites', 'success');
        this.Router.navigate(['/dashboard/user/favourites']);      
        this.getAllFav();

      }
    })
  }
  myFav: any;
  getAllFav(){
    let parms = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,

    }
      this._FavouriteService.onGetAllFav(parms).subscribe({
      next:(res: any)=>{
        console.log(res);
        this.myFav = res.data;
      },
      error:(err)=>{},
      complete:()=>{
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getTableData();
  }

 

  
}
