import { TestBed } from '@angular/core/testing';

import { StorehousesService } from './storehouses.service';
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
    const service: StorehousesService = TestBed.get(StorehousesService);
    expect(service).toBeTruthy();
  });
});
