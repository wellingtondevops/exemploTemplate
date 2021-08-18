import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProgressMultipleRightBottomComponent } from './modal-progress-multiple-right-bottom.component';

describe('ModalProgressRightBottomComponent', () => {
  let component: ModalProgressMultipleRightBottomComponent;
  let fixture: ComponentFixture<ModalProgressMultipleRightBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProgressMultipleRightBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProgressMultipleRightBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
