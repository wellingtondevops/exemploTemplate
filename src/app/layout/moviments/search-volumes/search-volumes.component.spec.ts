import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVolumesComponent } from './search-volumes.component';

describe('SearchVolumesComponent', () => {
  let component: SearchVolumesComponent;
  let fixture: ComponentFixture<SearchVolumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVolumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVolumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
