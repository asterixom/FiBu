import { Directive } from '@angular/core';
import { KontoSelectorComponent } from './konto-selector/konto-selector.component';

@Directive({
  selector: 'app-konto-selector[standardKonto]'
})
export class StandardKontoDirective {

  constructor(private element: KontoSelectorComponent) {
    this.element.useStandardKonto = true;
  }

}
