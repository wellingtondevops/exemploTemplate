import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProgressRightBottomComponent } from './modal-progress-right-bottom.component';

describe('ModalProgressRightBottomComponent', () => {
  let component: ModalProgressRightBottomComponent;
  let fixture: ComponentFixture<ModalProgressRightBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProgressRightBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProgressRightBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
