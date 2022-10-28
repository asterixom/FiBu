import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoSelectorComponent } from './konto-selector.component';

describe('KontoSelectorComponent', () => {
  let component: KontoSelectorComponent;
  let fixture: ComponentFixture<KontoSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontoSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KontoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
