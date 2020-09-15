import { TestBed } from '@angular/core/testing';

import { ArchivesImportGuardService } from './archives-import-guard.service';

describe('ArchivesImportGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchivesImportGuardService = TestBed.get(ArchivesImportGuardService);
    expect(service).toBeTruthy();
  });
});
