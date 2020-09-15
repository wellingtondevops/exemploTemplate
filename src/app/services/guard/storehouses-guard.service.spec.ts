import { TestBed } from '@angular/core/testing';

import { StorehousesGuardService } from './storehouses-guard.service';

describe('StorehousesGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorehousesGuardService = TestBed.get(StorehousesGuardService);
    expect(service).toBeTruthy();
  });
});
