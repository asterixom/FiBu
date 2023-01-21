import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbschlussComponent } from './abschluss.component';

describe('AbschlussComponent', () => {
  let component: AbschlussComponent;
  let fixture: ComponentFixture<AbschlussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbschlussComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbschlussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
