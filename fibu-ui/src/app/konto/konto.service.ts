import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Konto } from './model/konto.interface';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KontoService {

  private readonly endpoint = env.apiUrl+'/konten';

  constructor(private http: HttpClient) {
    this.konten$ = this.http.get<Konto[]>(this.endpoint).pipe(shareReplay(1));
  }

  ngOnInit(){
    this.refreshKonten();
  }

  private konten$: Observable<Konto[]>;

  konten(): Observable<Konto[]> {
    return this.konten$;
  }

  refreshKonten(){
    this.konten$ = this.http.get<Konto[]>(this.endpoint).pipe(shareReplay(1));
  }


  konto(id: string){
    return this.http.get<Konto[]>(this.endpoint+'/'+id);
  }

  standardGegenkonto(){
    return this.http.get<Konto>(this.endpoint+'/standardGegenkonto');
  }
}