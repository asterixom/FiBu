import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buchung } from './model/buchung.interface';
import { environment as env } from 'src/environments/environment';
import { Konto } from '../konto/model/konto.interface';
import { Kontoblatt } from './model/kontoblatt';

@Injectable({
  providedIn: 'root'
})
export class BuchungService {

  private readonly endpoint = env.apiUrl+'/buchungen';

  constructor(private http: HttpClient) { }

  buchungen(){
    return this.http.get<Buchung[]>(this.endpoint);
  }

  buchung(id: number){
    return this.http.get<Buchung>(this.endpoint+'/'+id);
  }
  
  save(buchung: Buchung){
    return this.http.put<Buchung>(this.endpoint, buchung);
  }

  kontoblaetter(){
    return this.http.get<Kontoblatt[]>(env.apiUrl+'/kontoblaetter');
  }
}