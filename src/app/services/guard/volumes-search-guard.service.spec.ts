import { TestBed } from '@angular/core/testing';

import { VolumesSearchGuardService } from './volumes-search-guard.service';

describe('VolumesSearchGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolumesSearchGuardService = TestBed.get(VolumesSearchGuardService);
    expect(service).toBeTruthy();
  });
});
