import { TestBed } from '@angular/core/testing';

import { VolumesService } from './volumes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VolumesService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: []
    }
  ));

  it('should be created', () => {
    const service: VolumesService = TestBed.get(VolumesService);
    expect(service).toBeTruthy();
  });
});
