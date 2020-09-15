import { TestBed } from '@angular/core/testing';

import { ArchivesErrorGuardService } from './archives-error-guard.service';

describe('ArchivesErrorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchivesErrorGuardService = TestBed.get(ArchivesErrorGuardService);
    expect(service).toBeTruthy();
  });
});
