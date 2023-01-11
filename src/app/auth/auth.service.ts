import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated=true;
  private _userId='abc';

  get userIsAuthenticated(){
    return this._isUserAuthenticated
  }

  get userId(){
    return this._userId;
  }
  constructor() { }
  login(){
    this._isUserAuthenticated=true
  }
  logout(){
    this._isUserAuthenticated=false;
  }
}
