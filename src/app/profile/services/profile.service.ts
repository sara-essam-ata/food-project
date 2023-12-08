import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ProfileService {

constructor(private _HttpClient:HttpClient) { }
    getCurrentUser(){
        return this._HttpClient.get('Users/currentUser')
    }
    editProfile(data:any){
        return this._HttpClient.put('Users', data)
    }
}
