import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IChangePassword } from 'src/app/models/ChangePassword';
import { ILogin } from 'src/app/models/login';
import { IResetPassword } from 'src/app/models/reset-password';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem('userToken')!==null){
      this.getProfile();
    }
  }
  role:string|null = '';
  onLogin(data:ILogin){
    return this._HttpClient.post('Users/Login', data)
  }
  getProfile(){
    let encoded:any = localStorage.getItem('userToken' );
    let decoded:any = jwtDecode(encoded);   
    
    console.log(decoded.userGroup);
    console.log(decoded.userName);
    localStorage.setItem('role', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);
    this.getRole();
    }
  getRole(){
    if(localStorage.getItem('userToken')!==null && localStorage.getItem('role')){
      this.role = localStorage.getItem('role');
    }
  }
  onRequestResetPassword(data:string){
    return this._HttpClient.post('Users/Reset/Request', {email:data})
  }
  onResetPassword(data:IResetPassword){
    return this._HttpClient.post('Users/Reset', data)
  }
  onChangePassword(data:IChangePassword){
    return this._HttpClient.put('Users/ChangePassword', data)
  }
}