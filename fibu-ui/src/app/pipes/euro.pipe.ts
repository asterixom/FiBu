import { formatNumber } from '@angular/common';
import { LOCALE_ID, Pipe, PipeTransform, Inject } from '@angular/core';


@Pipe({
  name: 'euro'
})
export class EuroPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(value?: number): string|undefined {
    return !value && value != 0 ? undefined : formatNumber(value,this.locale,'1.2-2')+' €';
    //return this.decimalPipe.transform(value,'0.2-2')+' €';
  }

}
