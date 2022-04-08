import { TestBed } from '@angular/core/testing';

import { CompaniesEffectService } from './companies.effect.service';

describe('Companies.EffectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompaniesEffectService = TestBed.get(CompaniesEffectService);
    expect(service).toBeTruthy();
  });
});
