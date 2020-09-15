import { TestBed } from '@angular/core/testing';

import { ArchivesRegisterGuardService } from './archives-register-guard.service';

describe('ArchivesRegisterGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchivesRegisterGuardService = TestBed.get(ArchivesRegisterGuardService);
    expect(service).toBeTruthy();
  });
});
