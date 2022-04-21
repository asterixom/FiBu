import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuchungComponent } from './buchung/buchung.component';
import { BuchungslisteComponent } from './buchungsliste/buchungsliste.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buchungen', component: BuchungslisteComponent},
  {path: 'buchung', component: BuchungComponent, children: [
    {path: 'neu', component: BuchungComponent},
    {path: ':id', component: BuchungComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
