import { Component, OnInit } from '@angular/core';
import { Buchung } from '../model/buchung.interface';
import { BuchungService } from '../buchung.service';
import { Konto } from '../../konto/model/konto.interface';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { KontoPipe } from '../../konto/konto.pipe';
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



  ausgabeEinnahme = false;


  buchung: Buchung = {
    belege: []
  }

  downloads: any = {
    // 'f519c957-16b1-4716-a10c-fde465658fd1': {
    //   progress: 0,
    //   localUrl: null,
    // }
  }

  uploadProgress: number | null = null;

  constructor(private buchungService: BuchungService, private fileService: FileService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  onFilesSelected(files: FileList){
    this.uploadProgress = 0;
    for(let fileNr in files){
      this.fileService.uploadFile(files[fileNr]).subscribe(res => {
        this.uploadProgress = (this.uploadProgress||0)+100/files.length;
        this.buchung.belege.push(res);
      });
    }
  }

  onSelectionChangedEvent(event: Event){
    let files = (event.target as HTMLInputElement).files;
    if(files) 
      this.onFilesSelected(files);
  }

  downloadFile(beleg:UploadedFile){
    if(this.downloads[beleg.uuid]?.localUrl){
      document.getElementById('dl-'+beleg.uuid)?.click();
      return;
    }
    this.downloads[beleg.uuid] = { filename: beleg.filename, progress: 0};
    this.fileService.downloadFile(beleg).subscribe(event=>{
      if (event.type === HttpEventType.DownloadProgress && event.total) {
        this.downloads[beleg.uuid].progress = (event.loaded/event.total*100)
      }else if (event.type === HttpEventType.Response && event.body) {
        this.downloads[beleg.uuid].progress = 100;
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
      this.buchung.belege.splice(this.buchung.belege.findIndex(b=>b.uuid==beleg.uuid),1);
    });
  }

  submit(){
    let finalBuchung = this.buchung;
    // if(this.kontoControl.value){
    //   finalBuchung.hauptkonto = this.kontoControl.value
    // }
    if(!this.ausgabeEinnahme && finalBuchung.betrag){
      finalBuchung.betrag = finalBuchung.betrag * -1
    }
    console.log(finalBuchung);
    this.buchungService.save(finalBuchung).subscribe(
      result => this.router.navigateByUrl('/buchung/'+result.buchungsnummer)
    );
  }
}
