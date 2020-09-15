import { TestBed } from '@angular/core/testing';

import { CompaniesGuardService } from './companies-guard.service';

describe('CompaniesGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompaniesGuardService = TestBed.get(CompaniesGuardService);
    expect(service).toBeTruthy();
  });
});
