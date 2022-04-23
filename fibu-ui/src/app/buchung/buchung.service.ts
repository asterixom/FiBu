import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buchung } from './model/buchung.interface';
import { environment as env } from 'src/environments/environment';
import { Konto } from './model/konto.interface';

@Injectable({
  providedIn: 'root'
})
export class BuchungService {

  constructor(private http: HttpClient) { }

  buchungen(){
    return this.http.get<Buchung[]>(env.apiUrl+'/buchung');
  }

  buchung(id: string){
    return this.http.get<Buchung>(env.apiUrl+'/buchung/'+id);
  }

  konten(){
    return this.http.get<Konto[]>(env.apiUrl+'/konto');
  }

  save(buchung: Buchung){
    return this.http.put<Buchung>(env.apiUrl+'/buchung', buchung);
  }
}
