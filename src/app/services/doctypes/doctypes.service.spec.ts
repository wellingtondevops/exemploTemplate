import { TestBed } from '@angular/core/testing';
import { DoctypesService } from './doctypes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DoctypesService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: []
    }
  ));

  it('should be created', () => {
    const service: DoctypesService = TestBed.get(DoctypesService);
    expect(service).toBeTruthy();
  });
});
