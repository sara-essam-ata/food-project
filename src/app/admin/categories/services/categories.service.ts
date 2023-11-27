import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService {

constructor(private _HttpClient:HttpClient) { }
    getCategories(data:any):Observable<any>{
      return this._HttpClient.get('Category', {params: data})
    }
    addCategory(data:string){
      return this._HttpClient.post('Category', {name : data})
    }
    deleteCategory(id:number){
      return this._HttpClient.delete(`Category/${id}`)
    }
    editCategory(id:number,data:string){
      return this._HttpClient.put(`Category/${id}`, {name:data})
    }
}
