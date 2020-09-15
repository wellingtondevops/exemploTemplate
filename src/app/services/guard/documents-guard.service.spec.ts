import { TestBed } from '@angular/core/testing';

import { DocumentsGuardService } from './documents-guard.service';

describe('DocumentsGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentsGuardService = TestBed.get(DocumentsGuardService);
    expect(service).toBeTruthy();
  });
});
