import { TestBed } from '@angular/core/testing';

import { SnowGuardService } from './snow-guard.service';

describe('SnowGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnowGuardService = TestBed.get(SnowGuardService);
    expect(service).toBeTruthy();
  });
});
