import { TestBed } from '@angular/core/testing';

import { CompaniesService } from './companies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompaniesService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: []
    }
  ));

  it('should be created', () => {
    const service: CompaniesService = TestBed.get(CompaniesService);
    expect(service).toBeTruthy();
  });
});
