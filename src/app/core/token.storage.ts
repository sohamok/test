import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';


const TOKEN_KEY = 'AuthToken';
const ROLE_KEY = 'AuthRole';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {
  storage = environment.storage;

  constructor() { }

  signOut() {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(ROLE_KEY);
    this.storage.clear();
  }

  public saveToken(token: string) {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return this.storage.getItem(TOKEN_KEY);
  }

  public saveRole(role: any) {
    this.storage.removeItem(ROLE_KEY);
    this.storage.setItem(ROLE_KEY,  JSON.stringify(role));
  }

  public getRole(): any {
    return JSON.parse(this.storage.getItem(ROLE_KEY));
  }

}
