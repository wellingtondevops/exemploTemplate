import { TestBed } from '@angular/core/testing';

import { DaenerysTywinSnowGuardService } from './daenerys-tywin-snow-guard.service';

describe('DaenerysTywinSnowGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaenerysTywinSnowGuardService = TestBed.get(DaenerysTywinSnowGuardService);
    expect(service).toBeTruthy();
  });
});
