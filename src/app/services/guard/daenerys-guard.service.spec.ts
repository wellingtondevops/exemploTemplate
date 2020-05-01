import { TestBed } from '@angular/core/testing';

import { DaenerysGuardService } from './daenerys-guard.service';

describe('ProfileGuardService', () => {
  window.localStorage.setItem('profile', JSON.stringify(['DAENERYS']))
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it('should be created', () => {
    const service: DaenerysGuardService = TestBed.get(DaenerysGuardService);
    expect(service).toBeTruthy();
  });
});
