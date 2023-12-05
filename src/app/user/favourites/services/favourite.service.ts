import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FavouriteService {

constructor(private _HttpClient:HttpClient) { }
    onAddToFav(id:number){
        return this._HttpClient.post('userRecipe', {recipeId: id})
    }
    onGetAllFav(){
        return this._HttpClient.get('userRecipe')
    }
    onRemoveFav(id:number){
        return this._HttpClient.delete(`userRecipe/${id}`)
    }
}
