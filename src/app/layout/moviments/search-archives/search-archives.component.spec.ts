import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArchivesComponent } from './search-archives.component';

describe('SearchArchivesComponent', () => {
  let component: SearchArchivesComponent;
  let fixture: ComponentFixture<SearchArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
