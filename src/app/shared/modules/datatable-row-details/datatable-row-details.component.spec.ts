import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableRowDetailsComponent } from './datatable-row-details.component';

describe('DatatableRowDetailsComponent', () => {
  let component: DatatableRowDetailsComponent;
  let fixture: ComponentFixture<DatatableRowDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableRowDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableRowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
