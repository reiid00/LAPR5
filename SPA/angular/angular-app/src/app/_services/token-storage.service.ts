import { Injectable } from '@angular/core';
import { Utilizador } from '../utilizador';

const TOKEN_KEY = null;
const USER_KEY = null;

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: Utilizador): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): Utilizador {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user!=null) {
      return JSON.parse(user);
    }

    return null;
  }

  public getUserId(): string {
    const user = window.sessionStorage.getItem(TOKEN_KEY);
    if (user!=null) {
      return JSON.parse(user);
    }

    return null;
  }
}