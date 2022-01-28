import { TestBed } from '@angular/core/testing';

import { AccessProfileGuardService } from './access-profile-guard.service';

describe('AccessProfileGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessProfileGuardService = TestBed.get(AccessProfileGuardService);
    expect(service).toBeTruthy();
  });
});
