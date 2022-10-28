import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KontoPipe } from '../konto.pipe';
import { KontoService } from '../konto.service';
import { Konto } from '../model/konto.interface';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-konto-selector',
  templateUrl: './konto-selector.component.html',
  styleUrls: ['./konto-selector.component.scss']
})
export class KontoSelectorComponent implements OnInit {

  @Input()
  label: string = '';

  @Input()
  useStandardKonto: boolean = false;

  @Input()
  konto?: Konto;
  @Output()
  kontoChange = new EventEmitter<Konto>();

  kontoControl = new FormControl();
  konten?: Konto[];
  kontenFiltered?: Observable<Konto[]>;
  standardGegenkonto?: Konto;
  selected?: Konto | '';

  constructor(private kontoService: KontoService) { }

  ngOnInit(): void {
    this.kontoService.konten().subscribe(
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
        if(this.useStandardKonto){
          this.kontoService.standardGegenkonto().subscribe(
            konto => this.kontoControl.setValue(konto)
          )
        }
      }
    );
    this.kontoControl.valueChanges.pipe(
      filter(value => this.isKonto(value))
    ).subscribe(
      kto => this.kontoChanged(kto)
    )
  }

  kontoDisplayFn(konto: Konto){
    return new KontoPipe().transform(konto);
  }

  selectFirst(){
    this.kontoControl.setValue(this.selected);
  }

  select(event: MatAutocompleteActivatedEvent){
    this.selected = event.option?.value;
  }

  kontoChanged(konto?: Konto){
    this.selected = konto;
    this.konto = konto;
    this.kontoChange.emit(konto);
  }

  kontoFilterFn(search: string): Konto[] {
    if(!this.konten){
      return [];
    }
    if(!search){
      this.konten;
    }
    let searchLower = search.toLowerCase();
    return this.konten.filter(konto => 
      konto.id.toString().includes(searchLower) ||
      konto.name.toLowerCase().includes(searchLower) ||
      konto.beschreibung?.toLowerCase().includes(searchLower));
  }

  isKonto(obj: any): obj is Konto {
    return typeof obj === 'object' && 'id' in obj && 'name' in obj;
  }

}
