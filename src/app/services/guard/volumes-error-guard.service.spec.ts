import { TestBed } from '@angular/core/testing';

import { VolumesErrorGuardService } from './volumes-error-guard.service';

describe('VolumesErrorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolumesErrorGuardService = TestBed.get(VolumesErrorGuardService);
    expect(service).toBeTruthy();
  });
});
