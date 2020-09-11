import { TestBed } from '@angular/core/testing';

import { TemplatesGuardService } from './templates-guard.service';

describe('TemplatesGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplatesGuardService = TestBed.get(TemplatesGuardService);
    expect(service).toBeTruthy();
  });
});
