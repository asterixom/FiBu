import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HelloWorldData } from './hello-world-data';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private router: Router) { }

  hello(){
    return this.http.get<HelloWorldData>(env.baseUrl+'/hello').pipe(
      catchError(error => {
        if(error.status==403 || error.status==401){
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      })
    );
  }
}
