import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImportRightBottomComponent } from './modal-import-right-bottom.component';

describe('ModalImportRightBottomComponent', () => {
  let component: ModalImportRightBottomComponent;
  let fixture: ComponentFixture<ModalImportRightBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImportRightBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImportRightBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
