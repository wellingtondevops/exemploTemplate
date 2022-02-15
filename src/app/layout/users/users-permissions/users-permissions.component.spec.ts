import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPermissionsComponent } from './users-permissions.component';

describe('UsersPermissionsComponent', () => {
  let component: UsersPermissionsComponent;
  let fixture: ComponentFixture<UsersPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
