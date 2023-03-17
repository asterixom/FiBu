import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BuchungService } from 'src/app/buchung/buchung.service';
import { Kontoblatt } from 'src/app/buchung/model/kontoblatt';
import { PeriodService } from 'src/app/period.service';

@Component({
  selector: 'app-kontoblaetter',
  templateUrl: './kontoblaetter.component.html',
  styleUrls: ['./kontoblaetter.component.scss']
})
export class KontoblaetterComponent implements OnInit {

  kontoblaetter$?: Observable<Kontoblatt[]>;

  constructor(private buchungService: BuchungService, private periodService: PeriodService) { }

  ngOnInit(): void {
    this.periodService.year.subscribe(year=>{
      this.kontoblaetter$ = this.buchungService.kontoblaetter(year+'-01-01',year+'-12-31').pipe(
        map(blaetter=>blaetter.filter(blatt=>blatt.buchungen.length>0 || blatt.alterSaldo ))
      );
    });
  }

}
