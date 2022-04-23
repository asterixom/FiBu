import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        const authorization = this.authenticationService.authorization;
        const isLoggedIn = authorization != null;
        const isApiUrl = request.url.startsWith(environment.apiUrl) || request.url.startsWith(environment.filesUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { 
                    Authorization: 'Basic '+authorization
                }
            });
        }

        return next.handle(request).pipe(catchError(err => {
            if(err.status==403 || err.status==401){
                this.authenticationService.clear();
                this.router.navigateByUrl('/login');
              }
            return throwError(err);
        }))
    }
}
