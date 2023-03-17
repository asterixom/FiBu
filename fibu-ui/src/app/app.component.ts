import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthenticationService } from './login/authentication.service';
import { PeriodService } from './period.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'fibu-ui';
  expandedMenu = true;
  year = 2022;

  menuItems = [
    // {name:'Home', path: '/'},
    // {name:'Login', path: 'login'},
    {name:'Buchungen', path:'buchung'},
    {name:'Abschluss', path:'abschluss'}
  ];

  currentMenuItem: Observable<string>;

  constructor(private router: Router, private authenticationService: AuthenticationService, public periodService: PeriodService) {
    this.currentMenuItem = this.router.events.pipe(filter(event=>event instanceof NavigationEnd), map(event=>(event as NavigationEnd).url));
  }

  home(){
    this.router.navigateByUrl('');
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  logout(){
    this.authenticationService.logout();
  }

  isCurrentRoute(path: String){
    return this.router.url == '/'+path;
  }
}
