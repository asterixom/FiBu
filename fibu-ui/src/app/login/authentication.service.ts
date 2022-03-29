import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: string|null = null;
  pass: string|null = '';
  authorization: string|null = null;

  private readonly key = 'authorization';

  constructor(private router: Router, private http: HttpClient) {
    this.authorization = localStorage.getItem(this.key);
  }

  login(user:string,pass:string){
    this.user = user;
    this.pass = pass;
    this.authorization = window.btoa(user+':'+pass);
    localStorage.setItem(this.key, this.authorization);
    this.router.navigateByUrl('');
  }

  clear() {
    this.authorization = null;
    localStorage.removeItem(this.key);
  }

  logout(){
    this.clear()
    this.http.get("/logout").subscribe(r=>{
      this.router.navigateByUrl('login');
    },err=>{
      this.router.navigateByUrl('login');
    });
  }
}
