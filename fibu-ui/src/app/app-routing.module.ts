import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuchungslisteComponent } from './buchung/liste/buchungsliste.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ViewComponent } from './buchung/view/view.component';
import { AbschlussComponent } from './abschluss/abschluss.component';
import { JournalComponent } from './abschluss/journal/journal.component';
import { KontoblaetterComponent } from './abschluss/kontoblaetter/kontoblaetter.component';
import { SaldenComponent } from './abschluss/salden/salden.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buchung', component: BuchungslisteComponent},
  {path: 'buchung/neu', component: ViewComponent},
  {path: 'buchung/:id', component: ViewComponent},
  {path: 'abschluss', component: AbschlussComponent},
  {path: 'abschluss/journal', component: JournalComponent},
  {path: 'abschluss/kontoblaetter', component: KontoblaetterComponent},
  {path: 'abschluss/salden', component: SaldenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
