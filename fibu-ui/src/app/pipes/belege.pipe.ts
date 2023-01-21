import { Pipe, PipeTransform } from '@angular/core';
import { UploadedFile } from '../files/model/file.interface';

@Pipe({
  name: 'belege'
})
export class BelegePipe implements PipeTransform {

  transform(value: UploadedFile[], ...args: string[]): String {
    return value.map(value=>value.belegnummer).join(',');
  }

}
