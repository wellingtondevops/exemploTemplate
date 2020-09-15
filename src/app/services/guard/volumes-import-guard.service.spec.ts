import { TestBed } from '@angular/core/testing';

import { VolumesImportGuardService } from './volumes-import-guard.service';

describe('VolumesImportGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolumesImportGuardService = TestBed.get(VolumesImportGuardService);
    expect(service).toBeTruthy();
  });
});
