import { TestBed } from '@angular/core/testing';

import { TywinGuardService } from './tywin-guard.service';

describe('TywinGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TywinGuardService = TestBed.get(TywinGuardService);
    expect(service).toBeTruthy();
  });
});
