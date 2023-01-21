import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KontoPipe } from '../../pipes/konto.pipe';
import { KontoService } from '../konto.service';
import { Konto } from '../model/konto.interface';
import { Observable } from 'rxjs';
import { map, startWith, filter, tap } from 'rxjs/operators';
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

  _konto?: Konto;
  
  @Input()
  set konto(k: Konto | undefined){
    this._konto=k;
    this.kontoControl.setValue(k);
    this.kontoChange.emit(k);
  }

  @Output()
  kontoChange = new EventEmitter<Konto>();

  _disabled: boolean = false;
  
  @Input()
  set disabled(dis: boolean){
    this._disabled = dis;
    if(dis){
      this.kontoControl.disable();
    }else{
      this.kontoControl.enable();
    }
  }

  kontoControl = new FormControl();
  konten?: Konto[];
  kontenFiltered?: Observable<Konto[]>;
  standardGegenkonto?: Konto;
  selected?: Konto | '';

  constructor(private kontoService: KontoService) { }

  ngOnInit(): void {
    if(this.disabled) this.kontoControl.disable();
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
            konto => {
              this.kontoControl.setValue(konto);
              this.kontoChanged(konto);
            }
          )
        }
        if(this.konto){
          this.kontoControl.setValue(this.konto);
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
    this._konto = konto;
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
    return obj != null && typeof obj === 'object' && 'id' in obj && 'name' in obj;
  }

}
