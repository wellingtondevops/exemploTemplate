import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsArchivesComponent } from './errors-archives.component';

describe('ErrorsArchivesComponent', () => {
  let component: ErrorsArchivesComponent;
  let fixture: ComponentFixture<ErrorsArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
