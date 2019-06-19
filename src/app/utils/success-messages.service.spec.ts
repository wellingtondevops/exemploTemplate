import { TestBed } from '@angular/core/testing';

import { SuccessMessagesService } from './success-messages.service';

describe('SuccessMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuccessMessagesService = TestBed.get(SuccessMessagesService);
    expect(service).toBeTruthy();
  });
});
