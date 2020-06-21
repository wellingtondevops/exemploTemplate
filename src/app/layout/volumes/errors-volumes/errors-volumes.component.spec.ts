import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsVolumesComponent } from './errors-volumes.component';

describe('ErrorsVolumesComponent', () => {
  let component: ErrorsVolumesComponent;
  let fixture: ComponentFixture<ErrorsVolumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsVolumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsVolumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
