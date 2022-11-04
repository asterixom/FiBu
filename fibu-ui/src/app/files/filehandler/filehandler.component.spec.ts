import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilehandlerComponent } from './filehandler.component';

describe('FilehandlerComponent', () => {
  let component: FilehandlerComponent;
  let fixture: ComponentFixture<FilehandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilehandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilehandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
