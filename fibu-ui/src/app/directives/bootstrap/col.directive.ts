import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[col]'
})
export class ColDirective {

  constructor() { }

  @HostBinding('class')
  elementClass = 'col';

}
