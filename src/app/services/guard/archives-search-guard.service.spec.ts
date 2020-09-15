import { TestBed } from '@angular/core/testing';

import { ArchivesSearchGuardService } from './archives-search-guard.service';

describe('ArchivesSearchGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchivesSearchGuardService = TestBed.get(ArchivesSearchGuardService);
    expect(service).toBeTruthy();
  });
});
