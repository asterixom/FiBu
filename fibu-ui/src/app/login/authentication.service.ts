import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: string|null = null;
  pass: string|null = '';
  authorization: string|null = null;

  private readonly key = 'authorization';

  constructor(private router: Router) {
    this.authorization = localStorage.getItem(this.key);
  }

  login(user:string,pass:string){
    this.user = user;
    this.pass = pass;
    this.authorization = window.btoa(user+':'+pass);
    localStorage.setItem(this.key, this.authorization);
    this.router.navigateByUrl('');
  }

  logout(){
    this.authorization = null;
    localStorage.removeItem(this.key);
    this.router.navigateByUrl('login');
  }
}
