import { TestBed } from '@angular/core/testing';

import { DepartamentsGuardService } from './departaments-guard.service';

describe('DepartamentsGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartamentsGuardService = TestBed.get(DepartamentsGuardService);
    expect(service).toBeTruthy();
  });
});
