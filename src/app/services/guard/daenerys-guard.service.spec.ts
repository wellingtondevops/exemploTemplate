import { TestBed } from '@angular/core/testing';

import { DaenerysGuardService } from './daenerys-guard.service';

describe('ProfileGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaenerysGuardService = TestBed.get(DaenerysGuardService);
    expect(service).toBeTruthy();
  });
});
