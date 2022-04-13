import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlImagesComponent } from './control-images.component';

describe('ControlImagesComponent', () => {
  let component: ControlImagesComponent;
  let fixture: ComponentFixture<ControlImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
