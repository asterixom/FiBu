import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuchungComponent } from './buchung/view/buchung.component';
import { BuchungslisteComponent } from './buchung/liste/buchungsliste.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NeueBuchungComponent } from './buchung/neu/neu.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buchung', component: BuchungslisteComponent},
  {path: 'buchung/neu', component: NeueBuchungComponent},
  {path: 'buchung/:id/edit', component: BuchungComponent},
  {path: 'buchung/:id', component: BuchungComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
