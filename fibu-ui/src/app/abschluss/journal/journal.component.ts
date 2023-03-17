import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuchungService } from 'src/app/buchung/buchung.service';
import { Buchung } from 'src/app/buchung/model/buchung.interface';
import { PeriodService } from 'src/app/period.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  public buchungen$?: Observable<Buchung[]>;

  constructor(private buchungService: BuchungService, private periodService: PeriodService) { }

  ngOnInit(): void {
    this.periodService.year.subscribe(year=>{
      this.buchungen$ = this.buchungService.buchungen(year+'-01-01',year+'-12-31');
    });
  }

}
