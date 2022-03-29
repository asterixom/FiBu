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

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  home(){
    this.router.navigateByUrl('');
  }

  logout(){
    this.authenticationService.logout();
  }
}
