import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../file.service';
import { UploadedFile } from '../model/file.interface';

@Component({
  selector: 'app-filehandler',
  templateUrl: './filehandler.component.html',
  styleUrls: ['./filehandler.component.scss']
})
export class FilehandlerComponent implements OnInit {

  @Output()
  belegeChange = new EventEmitter<UploadedFile[]>();

  @Input()
  belege: UploadedFile[] = [];

  @Input()
  disabled: boolean = false;

  downloads: any = {
    // 'f519c957-16b1-4716-a10c-fde465658fd1': {
    //   progress: 0,
    //   localUrl: null,
    // }
  }

  uploadProgress: number | null = null;

  timer : any = null;

  constructor(private fileService: FileService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  onFilesSelected(files: FileList){
    if(this.timer != null){
      clearTimeout(this.timer);
    }
    this.uploadProgress = 0;
    for(let fileNr in files){
      this.fileService.uploadFile(files[fileNr]).subscribe(res => {
        this.uploadProgress = (this.uploadProgress||0)+100/files.length;
        this.belege.push(res);
        this.belegeChange.emit(this.belege);
        if(this.uploadProgress>99){
          this.timer = setTimeout(()=>this.uploadProgress=null,5000);
        }
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
      this.belege.splice(this.belege.findIndex(b=>b.uuid==beleg.uuid),1);
      this.belegeChange.emit(this.belege);
    });
  }

}
