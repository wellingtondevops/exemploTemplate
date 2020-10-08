import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacityPoliticComponent } from './privacity-politic.component';

describe('PrivacityPoliticComponent', () => {
  let component: PrivacityPoliticComponent;
  let fixture: ComponentFixture<PrivacityPoliticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacityPoliticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacityPoliticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
