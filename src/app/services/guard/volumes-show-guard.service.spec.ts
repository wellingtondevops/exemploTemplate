import { TestBed } from '@angular/core/testing';

import { VolumesShowGuardService } from './volumes-show-guard.service';

describe('VolumesShowGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolumesShowGuardService = TestBed.get(VolumesShowGuardService);
    expect(service).toBeTruthy();
  });
});
