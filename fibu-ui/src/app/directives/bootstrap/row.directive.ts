import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[row]'
})
export class RowDirective {

  constructor() { }

  @HostBinding('class')
  elementClass = 'row';

}
