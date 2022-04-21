import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[container]'
})
export class ContainerDirective {

  constructor() {
  }

  @HostBinding('class')
  elementClass = 'container';

}
