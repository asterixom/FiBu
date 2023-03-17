import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  public _year = 2022;

  private readonly year$ = new BehaviorSubject(this._year);
  public readonly year = this.year$.asObservable();

  constructor() { 
    this.year$.next(this._year);
  }

  next(): void{
    this._year = this._year + 1;
    this.year$.next(this._year);
  }
  previous(): void{
    this._year = this._year - 1;
    this.year$.next(this._year);
  }

}
