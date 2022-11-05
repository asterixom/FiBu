import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthInterceptor } from './login/basicauth.interceptor';
import { BuchungslisteComponent } from './buchung/liste/buchungsliste.component';
import { ContainerDirective } from './directives/bootstrap/container.directive';
import { RowDirective } from './directives/bootstrap/row.directive';
import { ColDirective } from './directives/bootstrap/col.directive';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { KontoPipe } from './konto/konto.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { KontoSelectorComponent } from './konto/konto-selector/konto-selector.component';
import { StandardKontoDirective } from './konto/standard-konto.directive';
import { FilehandlerComponent } from './files/filehandler/filehandler.component';
import { ViewComponent } from './buchung/view/view.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    BuchungslisteComponent,
    ContainerDirective,
    RowDirective,
    ColDirective,
    KontoPipe,
    KontoSelectorComponent,
    StandardKontoDirective,
    FilehandlerComponent,
    ViewComponent,
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
    MatSortModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CurrencyMaskModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: MAT_DATE_FORMATS, useValue: 
      {
        parse: {
          dateInput: 'DD.MM.YYYY',
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        },
      }
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }