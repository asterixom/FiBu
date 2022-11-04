import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Konto } from 'src/app/konto/model/konto.interface';
import { BuchungService } from '../buchung.service';
import { Buchung } from '../model/buchung.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  error?: string;
  loading = true;

  disabled = false;

  ausgabeEinnahme = false;

  standardKonto = false;


  buchung: Buchung = {
    belege: []
  }

  constructor(private route: ActivatedRoute, private buchungService: BuchungService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(!params['id']) {
        this.standardKonto = true;
        this.loading=false;
        return;
      }
      this.disabled = true;
      this.loadBuchung(params['id']);
    });
  }

  submit(){
    let finalBuchung = this.buchung;
    if(!this.ausgabeEinnahme && finalBuchung.betrag){
      finalBuchung.betrag = finalBuchung.betrag * -1
    }
    console.log(finalBuchung);
    this.loading=true;
    this.buchungService.save(finalBuchung).subscribe(
      result => {
        this.loading=false;
        this.disabled=true;
        this.router.navigateByUrl('/buchung/'+result.buchungsnummer)
      }
    );
  }

  loadBuchung(id?: number){
    if(!id) return;
    this.loading = true;
    this.error = undefined;
    this.buchungService.buchung(id).subscribe(
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
  }

  onKeyDown(event: KeyboardEvent){
    console.log(event.key);
    if(event.key === "+"){
      this.ausgabeEinnahme = true;
    }
    if(event.key === "-"){
      this.ausgabeEinnahme = false;
    }
  }

  edit(){
    this.disabled=false;
  }

  cancel(){
    this.disabled=true;
    this.loadBuchung(this.buchung.buchungsnummer);
  }

}
