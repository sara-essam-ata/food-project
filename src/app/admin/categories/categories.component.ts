import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ICategory , ICategoryTable } from './models/category';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/sheard/delete/delete.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private _CategoriesService:CategoriesService, private dialog:MatDialog, private ToastrService:ToastrService) { }

  tableResponse: ICategoryTable | undefined ;
  tableData: ICategory[] | undefined =[];

  pageSize: number= 10;
  pageNumber: number | undefined= 1;
  searchValue:string='';

  ngOnInit() {
    this.getTableData();
    }
  getTableData(){
    let prams ={
      pageSize : this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue
    };
      
    this._CategoriesService.getCategories(prams).subscribe({
      next: (res) =>{
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data
        console.log(this.tableResponse);    
      }
    })
  }
 
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {},
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result)
        this.onAddCategory(result)
      }
    });
  }  
  onAddCategory(data:string){
    this._CategoriesService.addCategory(data).subscribe({
      next:(res)=>{
        console.log(res);
      }, error:(err)=>{
        console.log(err);
        this.ToastrService.error('error')
      }, complete: ()=>{
        this.ToastrService.success('category added','Success');
        this.getTableData();
      }
    })
  }

  openDeleteDialog(categoryData:any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: categoryData,
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result.id);
        this.onDeleteCategory(result.id);
      }
    });
  }  
  onDeleteCategory(id:number){
    this._CategoriesService.deleteCategory(id).subscribe({
      next:(res)=>{
        console.log(res);
      }, error:(err)=>{
        console.log(err);
        this.ToastrService.error('error')
      }, complete: ()=>{
        this.ToastrService.success('category deleted','Success');
        this.getTableData();
      }
    })
  }

  openEditCategory(categoryData:any){
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: categoryData,      
      width: '40%'
    });
    console.log();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        
        console.log(result.name);
        console.log(result.id);
        this.onEditCategory(result.id, result.name);
      }
    });
  }
  onEditCategory(id:number, data:string){
    this._CategoriesService.editCategory(id,data).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err.message);
      },
      complete:()=>{
        console.log('fine');
        
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageNumber= this.tableResponse?.pageNumber;
    this.pageSize= e.pageSize;
    this.getTableData();
    // this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex;
  }

}
