import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leftpad'
})
export class LeftpadPipe implements PipeTransform {

  transform(value: number|string|undefined, ...args: number[]): string|undefined {
    return !value && value != 0 ? undefined : value.toString().padStart(args[0],'0');
  }

}
