import { TestBed } from '@angular/core/testing';

import { DoctypesService } from './doctypes.service';

describe('DoctypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctypesService = TestBed.get(DoctypesService);
    expect(service).toBeTruthy();
  });
});
