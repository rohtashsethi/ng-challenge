import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token = '';

  constructor() { }

  getAccessToken(): string {
    return this.token;
  }

  setAccessToken(token: string): void {
    this.token = token;
  }
}
