import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuchungService } from 'src/app/buchung/buchung.service';
import { Buchung } from 'src/app/buchung/model/buchung.interface';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  public buchungen$?: Observable<Buchung[]>;

  constructor(private buchungService: BuchungService) { }

  ngOnInit(): void {
    this.buchungen$ = this.buchungService.buchungen();
  }

}
