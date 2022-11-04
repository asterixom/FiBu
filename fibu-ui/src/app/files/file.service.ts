import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { UploadedFile } from './model/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly endpoint = env.filesUrl+'/';

  constructor(private http: HttpClient) { }

  uploadFile(file: File) : Observable<UploadedFile> {
    const formData: FormData = new FormData();
    formData.append('file', file);
   
    return this.http.put<UploadedFile>(this.endpoint, formData);
  }

  getUrl(file: UploadedFile){
    return this.endpoint+file.uuid;//+(file.filetype?'.'+file.filetype:'');
  }

  downloadFile(file: UploadedFile) {
    return this.http.get(this.getUrl(file), {responseType: 'blob', reportProgress: true, observe: 'events'});
  }

  deleteFile(file: UploadedFile) {
    return this.http.delete(this.getUrl(file));
  }
}
