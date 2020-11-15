import { TestBed } from '@angular/core/testing';

import { RequestersService } from './requesters.service';

describe('RequestersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestersService = TestBed.get(RequestersService);
    expect(service).toBeTruthy();
  });
});
