import { TestBed } from '@angular/core/testing';

import { DepartamentsService } from './departaments.service';

describe('DepartamentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartamentsService = TestBed.get(DepartamentsService);
    expect(service).toBeTruthy();
  });
});
