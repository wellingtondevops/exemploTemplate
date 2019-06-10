import { TestBed } from '@angular/core/testing';

import { VolumesService } from './volumes.service';

describe('VolumesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolumesService = TestBed.get(VolumesService);
    expect(service).toBeTruthy();
  });
});
