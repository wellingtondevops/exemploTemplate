import { TestBed } from '@angular/core/testing';

import { AccessProfilesService } from './access-profiles.service';

describe('AccessProfilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessProfilesService = TestBed.get(AccessProfilesService);
    expect(service).toBeTruthy();
  });
});
