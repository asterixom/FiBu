import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthInterceptor } from './login/basicauth.interceptor';
import { BuchungslisteComponent } from './buchungsliste/buchungsliste.component';
import { ContainerDirective } from './directives/bootstrap/container.directive';
import { RowDirective } from './directives/bootstrap/row.directive';
import { ColDirective } from './directives/bootstrap/col.directive';
import { MatSortModule } from '@angular/material/sort';
import { BuchungComponent } from './buchung/buchung.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    BuchungslisteComponent,
    ContainerDirective,
    RowDirective,
    ColDirective,
    BuchungComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
