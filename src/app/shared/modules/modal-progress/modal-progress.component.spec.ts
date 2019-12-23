import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProgressComponent } from './modal-progress.component';

describe('ModalProgressComponent', () => {
  let component: ModalProgressComponent;
  let fixture: ComponentFixture<ModalProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
