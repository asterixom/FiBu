import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Buchung } from '../model/buchung.interface';
import { BuchungService } from '../buchung.service';

@Component({
  selector: 'app-buchung',
  templateUrl: './buchung.component.html',
  styleUrls: ['./buchung.component.scss']
})
export class BuchungComponent implements OnInit {

  buchung?: Buchung;

  loading = true;
  error?: string;

  constructor(private route: ActivatedRoute, private service: BuchungService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.service.buchung(params['id']).subscribe(
        response => {
          this.buchung = response;
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          if(error.status == 404){
            this.error = "Die gesuchte Buchung konnte nicht gefunden werden.";
          }else{
            this.error = "Es gab einen Fehler beim Laden der Buchung: "+error.status
          }
          this.loading = false;
        }
      );
    });
  }

}
