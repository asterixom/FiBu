import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuchungslisteComponent } from './buchung/liste/buchungsliste.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ViewComponent } from './buchung/view/view.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buchung', component: BuchungslisteComponent},
  {path: 'buchung/neu', component: ViewComponent},
  {path: 'buchung/:id', component: ViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
