import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeService } from '../../services/recipe.service';
import { ICategory, ITag } from '../../models/recipe';
import { ActivatedRoute, Router, UrlSegment} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss'],
})
export class AddEditRecipeComponent implements OnInit {
  isEditMode: boolean = false;
  isAddMode: boolean = true;
  isUpdate: boolean = false;
  imgSrc: any;
  tags: ITag[]= [];
  categories: ICategory[]= [];
  recipeId:any;
  recipeData: any;
  recipeForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(null),
  
  })
  form: any;
  constructor(private _HelperService:HelperService,
    private _RecipeService:RecipeService, 
    private Router:Router,
    private _ToastrService:ToastrService,
    _ActivatedRoute:ActivatedRoute,
    private route: ActivatedRoute
     ) {
        this.recipeId = _ActivatedRoute.snapshot.params['id'];
        if(this.recipeId){
          this.getRecpesById(this.recipeId);
          this.isUpdate= true;
          this.route.url.subscribe(url=>{
            this.isEditMode=url.some(segment=> segment.path ==='edit')
            this.disableFormControls();
          })
          this.route.url.subscribe(url=>{
            this.isAddMode=url.some(segment=> segment.path ==='add')
            this.enableFormControls();
          });
        }
        else{
          this.isUpdate=false;
        }
      }

  ngOnInit() {
    this.getAlltags();
    this.getAllCategories();
  }  
  
  disableFormControls() {
      if (!this.isEditMode) {
        this.recipeForm.get('name')?.disable();
        this.recipeForm.get('price')?.disable();
        this.recipeForm.get('description')?.disable();
        this.recipeForm.get('tagId')?.disable();
        this.recipeForm.get('categoriesIds')?.disable();
        this.recipeForm.get('recipeImage')?.disable();
      }
    }
  enableFormControls() {
    if (this.isAddMode) {
      this.recipeForm.get('name')?.enable();
      this.recipeForm.get('price')?.enable();
      this.recipeForm.get('description')?.enable();
      this.recipeForm.get('tagId')?.enable();
      this.recipeForm.get('categoriesIds')?.enable();
      this.recipeForm.get('recipeImage')?.enable();
    }
  }
  
      
  getRecpesById(id:number){
    this._RecipeService.getRecipeByid(id).subscribe({
      next:(res)=>{
        this.recipeData = res;
      },
      error:(err)=>{
      },
      complete:()=>{          
        this.imgSrc = 'https://upskilling-egypt.com/' + this.recipeData?.imagePath,
        this.recipeForm.patchValue({
          name:this.recipeData?.name,
          price:this.recipeData?.price,
          tagId:this.recipeData?.tag.id,
          categoriesIds:this.recipeData?.category[0].id,
          description:this.recipeData?.description,
        }); 
        
      }
    })
  }

  onSupmit(data:FormGroup){
    console.log(data.value);
    let myData = new FormData();
    myData.append('name', data.value.name);
    myData.append('price', data.value.price);
    myData.append('description', data.value.description);
    myData.append('tagId', data.value.tagId);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('recipeImage', this.imgSrc, this.imgSrc.name);

    if(this.recipeId){
      this._RecipeService.editRecipe(this.recipeId,myData).subscribe({
        next:(res)=>{
        },
        error:(err)=>{
        },
        complete:()=>{
          this._ToastrService.success('Recipe updated', 'Success');
          this.Router.navigate(['/dashboard/admin/recipes'])
        }
      })
    }
    else{
      this._RecipeService.addRecipe(myData).subscribe({
        next:(res)=>{
        },
        error:(err)=>{
        },
        complete:()=>{
          this._ToastrService.success('Recipe deleted', 'Success');
          this.Router.navigate(['/dashboard/admin/recipes'])
        }
      })
    }
  }
  
  getAlltags(){
    this._HelperService.getTags().subscribe({
      next:(res)=>{
        this.tags = res;
        console.log(this.tags);
        
      }
    })
}

getAllCategories(){
  this._HelperService.getCategories().subscribe({
    next:(res)=>{
      this.categories = res.data;
      console.log(this.categories);
      
    }
  })
}

files: File[] = [];
onSelect(event:any) {
  console.log(event);
  this.imgSrc= event.addedFiles[0];
  this.files.push(...event.addedFiles);
}

onRemove(event:any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
}
