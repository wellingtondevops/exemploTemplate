import { TestBed } from '@angular/core/testing';

import { ArchivesShowGuardService } from './archives-show-guard.service';

describe('ArchivesShowGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchivesShowGuardService = TestBed.get(ArchivesShowGuardService);
    expect(service).toBeTruthy();
  });
});
