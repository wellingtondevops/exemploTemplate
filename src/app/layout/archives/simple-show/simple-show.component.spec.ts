import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleShowComponent } from './simple-show.component';

describe('SimpleShowComponent', () => {
  let component: SimpleShowComponent;
  let fixture: ComponentFixture<SimpleShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
