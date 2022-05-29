import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Konto } from '../konto/model/konto.interface';

@Pipe({
  name: 'konto'
})
export class KontoPipe implements PipeTransform {

  transform(konto: Konto, ...args: string[]): string {
    if(!konto) return '';
    return konto.id + ' - ' + konto.name;
  }

}
