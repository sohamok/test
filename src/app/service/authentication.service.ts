import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { TokenStorage } from '../core/token.storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = environment.apiUrl;
  internetStatus;
  loggedInUser  = null;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private token: TokenStorage, private router : Router) { }

  isTokenExpired(token){
    return this.jwtHelper.isTokenExpired(token);
  }

  saveToken(token){
    this.token.saveToken(token);
  }

  isLoggedIn() {
    let storeToken= this.token.getToken();
    console.log(this.jwtHelper.getTokenExpirationDate(storeToken));
    console.log(this.jwtHelper.decodeToken(storeToken));
    console.log(new Date());
    
    console.log(this.isTokenExpired(storeToken));
    
    if(this.isTokenExpired(storeToken)){
      // this.token.signOut();
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  getUser(){
    let token = this.token.getToken();
    if(token){
      return this.jwtHelper.decodeToken(token);
    }
  }

  logOut() {
    this.token.signOut();
    this.router.navigateByUrl('/login');
  }
}
