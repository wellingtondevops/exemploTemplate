import { TestBed } from '@angular/core/testing';

import { ArquivesService } from './archives.service';

describe('ArquivesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArquivesService = TestBed.get(ArquivesService);
    expect(service).toBeTruthy();
  });
});