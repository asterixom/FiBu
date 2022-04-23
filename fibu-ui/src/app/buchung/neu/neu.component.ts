import { Component, OnInit } from '@angular/core';
import { Buchung } from '../model/buchung.interface';
import { BuchungService } from '../buchung.service';
import { Konto } from '../model/konto.interface';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { KontoPipe } from '../konto.pipe';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-neu',
  templateUrl: './neu.component.html',
  styleUrls: ['./neu.component.scss']
})
export class NeueBuchungComponent implements OnInit {

  error?: string;

  konten?: Konto[];
  kontenFiltered?: Observable<Konto[]>;

  kontoControl = new FormControl();

  ausgabeEinnahme = false;

  selected?: Konto | '';

  buchung: Buchung = {
  }

  constructor(private service: BuchungService, private router: Router) { }

  ngOnInit(): void {
    this.service.konten().subscribe(
      konten => {
        this.konten=konten;
        this.kontenFiltered = this.kontoControl.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(name => this.kontoFilterFn(name)),
        );
        this.kontenFiltered?.subscribe(array => {
          if(array.length<=0) this.selected='';
        });
      }
    );
    
  }

  kontoDisplayFn(konto: Konto){
    return new KontoPipe().transform(konto);
  }

  kontoFilterFn(search: string): Konto[] {
    if(!this.konten){
      return [];
    }
    if(!search){
      this.konten;
    }
    // console.log(search);
    let searchLower = search.toLowerCase();
    return this.konten.filter(konto => 
      konto.id.toString().includes(searchLower) ||
      konto.name.toLowerCase().includes(searchLower) ||
      konto.beschreibung?.toLowerCase().includes(searchLower));
  }

  selectFirst(){
    this.kontoControl.setValue(this.selected);
  }

  select(event: MatAutocompleteActivatedEvent){
    this.selected = event.option?.value;
  }

  submit(){
    let finalBuchung = this.buchung;
    if(this.kontoControl.value){
      finalBuchung.hauptkonto = this.kontoControl.value
    }
    if(!this.ausgabeEinnahme && finalBuchung.betrag){
      finalBuchung.betrag = finalBuchung.betrag * -1
    }
    console.log(finalBuchung);
    this.service.save(finalBuchung).subscribe(
      result => this.router.navigateByUrl('/buchung/'+result.buchungsnummer)
    );
  }
}
