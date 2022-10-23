import { Component, OnInit } from '@angular/core';
import { Buchung } from '../model/buchung.interface';
import { BuchungService } from '../buchung.service';
import { Konto } from '../../konto/model/konto.interface';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { KontoPipe } from '../konto.pipe';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { KontoService } from '../../konto/konto.service';
import { FileService } from '../../files/file.service';
import { UploadedFile } from 'src/app/files/model/file.interface';
import { HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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
    belege: [{filename: 'test.jsonc', uuid: 'f519c957-16b1-4716-a10c-fde465658fd1', filetype: 'jsonc'}]
  }

  downloads: any = {
    // 'f519c957-16b1-4716-a10c-fde465658fd1': {
    //   progress: 0,
    //   localUrl: null,
    // }
  }

  constructor(private buchungService: BuchungService, private kontoService: KontoService, private fileService: FileService, private router: Router, private sanitizer: DomSanitizer) { }

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

  onFilesSelected(files: FileList){
    for(let fileNr in files){
      this.fileService.uploadFile(files[fileNr]).subscribe(
        res => this.buchung.belege.push(res)
      );
      
    }
  }

  onSelectionChangedEvent(event: Event){
    let files = (event.target as HTMLInputElement).files;
    if(files) 
      this.onFilesSelected(files);
  }

  downloadFile(beleg:UploadedFile){
    console.log(this.downloads[beleg.uuid]);
    if(this.downloads[beleg.uuid]?.localUrl){
      document.getElementById('dl-'+beleg.uuid)?.click();
      return;
    }
    this.downloads[beleg.uuid] = { filename: beleg.filename, progress: 0};
    this.fileService.downloadFile(beleg).subscribe(event=>{
      if (event.type === HttpEventType.DownloadProgress && event.total) {
        this.downloads[beleg.uuid].progress = (event.loaded/event.total*100)
      }else if (event.type === HttpEventType.Response && event.body) {
        const url = window.URL.createObjectURL(event.body);
        this.downloads[beleg.uuid].localUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        document.getElementById('dl-'+beleg.uuid)?.click();
      }
    });
  }

  deleteFile(beleg:UploadedFile){
    if(this.downloads[beleg.uuid]?.localUrl){
      window.URL.revokeObjectURL(this.downloads[beleg.uuid].localUrl);
    }
    this.fileService.deleteFile(beleg).subscribe(data=>{
      this.downloads[beleg.uuid] = null;
    });
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
    this.buchungService.save(finalBuchung).subscribe(
      result => this.router.navigateByUrl('/buchung/'+result.buchungsnummer)
    );
  }
}
