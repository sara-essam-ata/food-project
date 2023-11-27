import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipeTable } from '../models/recipe';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeService {

constructor(private  _HttpClient:HttpClient) { }
    getRecipes(data:IRecipeTable):Observable<any>{
        return this._HttpClient.get('Recipe')
    }
}
