import { TestBed } from '@angular/core/testing';

import { UsersGuardService } from './users-guard.service';

describe('UsersGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersGuardService = TestBed.get(UsersGuardService);
    expect(service).toBeTruthy();
  });
});
