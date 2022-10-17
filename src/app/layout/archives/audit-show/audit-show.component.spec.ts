import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditShowComponent } from './audit-show.component';

describe('AuditShowComponent', () => {
  let component: AuditShowComponent;
  let fixture: ComponentFixture<AuditShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
