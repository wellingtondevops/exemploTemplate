import { TestBed } from '@angular/core/testing';

import { MovimentsService } from './moviments.service';

describe('MovimentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovimentsService = TestBed.get(MovimentsService);
    expect(service).toBeTruthy();
  });
});
