import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Konto } from './model/konto.interface';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KontoService {

  private readonly endpoint = env.apiUrl+'/konten';

  constructor(private http: HttpClient) { }

  konten(){
    return this.http.get<Konto[]>(this.endpoint);
  }

  konto(id: string){
    return this.http.get<Konto[]>(this.endpoint+'/'+id);
  }
}