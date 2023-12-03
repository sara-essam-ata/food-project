import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({

    providedIn: 'root',
  
})
export class UsersAdminService {

constructor(private _HttpClient:HttpClient) { }
    getAllUsers(prams:any):Observable<any>{
        return this._HttpClient.get('Users', {params:prams})
    }
    deleteUser(id:number){
        return this._HttpClient.delete(`Users/${id}`)
      }
}
