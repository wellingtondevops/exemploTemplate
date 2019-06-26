import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DatatablesComponent } from './datatables.component';
import { DatatablesModule } from './datatables.module';

describe('DatatablesComponent', () => {
  let component: DatatablesComponent;
  let fixture: ComponentFixture<DatatablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatatablesModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
