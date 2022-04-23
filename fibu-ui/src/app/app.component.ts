import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './login/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fibu-ui';
  expandedMenu = true;

  menuItems = [
    // {name:'Home', path: '/'},
    // {name:'Login', path: 'login'},
    {name:'Buchungen', path:'buchung'}
  ];

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  home(){
    this.router.navigateByUrl('');
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  logout(){
    this.authenticationService.logout();
  }
}
