import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoblaetterComponent } from './kontoblaetter.component';

describe('KontoblaetterComponent', () => {
  let component: KontoblaetterComponent;
  let fixture: ComponentFixture<KontoblaetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontoblaetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KontoblaetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
