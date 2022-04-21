import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchungslisteComponent } from './buchungsliste.component';

describe('BuchungslisteComponent', () => {
  let component: BuchungslisteComponent;
  let fixture: ComponentFixture<BuchungslisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuchungslisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuchungslisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
