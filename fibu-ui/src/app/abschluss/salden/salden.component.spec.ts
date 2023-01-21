import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldenComponent } from './salden.component';

describe('SaldenComponent', () => {
  let component: SaldenComponent;
  let fixture: ComponentFixture<SaldenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaldenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
