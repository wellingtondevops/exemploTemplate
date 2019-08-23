import { TestBed } from '@angular/core/testing';

import { DaenerysTywinGuardService } from './daenerys-tywin-guard.service';

describe('DaenerysTywinGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaenerysTywinGuardService = TestBed.get(DaenerysTywinGuardService);
    expect(service).toBeTruthy();
  });
});
