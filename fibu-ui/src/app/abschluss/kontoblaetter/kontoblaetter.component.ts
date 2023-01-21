import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BuchungService } from 'src/app/buchung/buchung.service';
import { Kontoblatt } from 'src/app/buchung/model/kontoblatt';

@Component({
  selector: 'app-kontoblaetter',
  templateUrl: './kontoblaetter.component.html',
  styleUrls: ['./kontoblaetter.component.scss']
})
export class KontoblaetterComponent implements OnInit {

  kontoblaetter$?: Observable<Kontoblatt[]>;

  constructor(private buchungService: BuchungService) { }

  ngOnInit(): void {
    this.kontoblaetter$ = this.buchungService.kontoblaetter().pipe(
      map(blaetter=>blaetter.filter(blatt=>blatt.buchungen.length>0))
    );
  }

}
