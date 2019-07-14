import { TestBed } from '@angular/core/testing';

import { ArquivesService } from './archives.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArquivesService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: []
    }
  ));

  it('should be created', () => {
    const service: ArquivesService = TestBed.get(ArquivesService);
    expect(service).toBeTruthy();
  });
});
