import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({

    providedIn: 'root',
  
})
export class RecipeService {

constructor(private  _HttpClient:HttpClient) { }
    getRecipes(data:any):Observable<any>{
        return this._HttpClient.get('Recipe',{params:data})
    }
    addRecipe(data:any){
        return this._HttpClient.post('Recipe' , data)
    }
    deleteRecipe(id:number){
        return this._HttpClient.delete(`Recipe/${id}`)
    }
}
