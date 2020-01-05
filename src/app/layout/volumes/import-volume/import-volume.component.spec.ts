import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportVolumeComponent } from './import-volume.component';

describe('ImportVolumeComponent', () => {
  let component: ImportVolumeComponent;
  let fixture: ComponentFixture<ImportVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
